const Groq = require("groq-sdk");
const groq = new Groq({ apiKey: process.env.GROQ_API });

const sendGroqMessage = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: [
        {
          role: "system",
          content: `Extract ingredients and their quantities from the user's message.

- Correct any spelling mistakes and use proper English grammar, including correct pluralization, capitalization, and punctuation.
- Normalize ingredient names to their most common singular form in lowercase (e.g., "tomatoes" → "tomato", "potatoes" → "potato"), except do NOT pluralize or singularize uncountable ingredients such as "cheese", "rice", "flour", "sugar", "butter", "water", "milk", "salt", "oil", "honey", and "vinegar". Keep these in singular form.
- Quantities should be integers. If no quantity is given, assume quantity = 1.
- Return only a JSON object with a single key "ingredients". The value should be a JSON object where keys are the normalized ingredient names and values are the corresponding quantities.
- Do not include any text other than the JSON object. No markdown, no explanations.

Respond with ONLY the JSON object. No extra text, no explanations, no markdown formatting.`

        },
        {
          role: "user",
          content: message
        }
      ],
    });

    let rawReply = completion.choices[0]?.message?.content.trim();

    if (rawReply.startsWith("```") && rawReply.endsWith("```")) {
      rawReply = rawReply.slice(3, -3).trim();
    }

    const jsonMatch = rawReply.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error("No JSON object found in model response:", rawReply);
      return res.status(500).json({ error: "Model response did not contain valid JSON." });
    }

    let parsed;
    try {
      parsed = JSON.parse(jsonMatch[0]);
      if (typeof parsed !== "object" || Array.isArray(parsed)) {
        throw new Error("Response is not a valid JSON object.");
      }
    } catch (err) {
      console.error("Failed to parse JSON:", jsonMatch[0]);
      return res.status(500).json({ error: "Invalid model response JSON." });
    }

    res.status(200).json(parsed);

  } catch (error) {
    console.error("Ingredient extraction Groq API error", error);
    res.status(500).json({ error: "Ingredient extraction from Groq failed" });
  }
};


const KNOWN_ALLERGIES = [
  "dairy",
  "egg",
  "gluten",
  "grain",
  "peanut",
  "seafood",
  "sesame",
  "shellfish",
  "soy",
  "sulfite",
  "tree nut",
  "wheat"
];

const KNOWN_DIETS = [
  "gluten free",
  "ketogenic",
  "vegetarian",
  "lacto vegetarian",
  "ovo vegetarian",
  "vegan",
  "pescetarian",
  "paleo",
  "primal",
  "low fodmap",
  "whole30"
];

const userPreferences = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).send({
        success: false,
        message: "Message is required"
      })
    }
    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: [
        {
          role: "system",
          content: `Extract allergies, diet preferences, and ingredients the user dislikes from their message.
- Infer diet preferences based on phrases like "no animal products" → "vegan", "avoid carbs" → "ketogenic", or "no dairy or meat" → "paleo".
- Normalize all values to lowercase and match against the following:
  - Diets: "gluten free", "ketogenic", "vegetarian", "lacto-vegetarian", "ovo-vegetarian", "vegan", "pescetarian", "paleo", "primal", "low fodmap", "whole30"
  - Allergies/Intolerances: "dairy", "egg", "gluten", "grain", "peanut", "seafood", "sesame", "shellfish", "soy", "sulfite", "tree nut", "wheat"
- Correct common misspellings (e.g., "vegaan" → "vegan", "glutan" → "gluten").
- Return a JSON object with keys: "allergies", "dietPreferences", and "dislikes".
- Each key's value must be an array of lowercase strings.
- If nothing is mentioned, return an empty array for that key.
- Respond ONLY with the JSON object. No extra text or markdown formatting.
`

        },
        {
          role: "user",
          content: message
        }
      ],

    });

    let rawReply = completion.choices[0]?.message?.content.trim();

    if (rawReply.startsWith("```") && rawReply.endsWith("```")) {
      rawReply = rawReply.slice(3, -3).trim();
    }
    let parsed;
    try {
      parsed = JSON.parse(rawReply);

      if (
        typeof parsed !== "object" ||
        !Array.isArray(parsed.allergies) ||
        !Array.isArray(parsed.dietPreferences) ||
        !Array.isArray(parsed.dislikes)
      ) {
        throw new Error("Response does not match expected structure.");
      }
    } catch (err) {
      console.error("Failed to parse JSON:", rawReply);
      return res.status(500).json({ error: "Invalid model response JSON." });
    }


    const cleanAllergies = parsed.allergies.map(a => a.toLowerCase());
    const cleanDiets = parsed.dietPreferences.map(d => d.toLowerCase());
    const cleanDislikes = parsed.dislikes.map(d => d.toLowerCase());


    const validatedAllergies = cleanAllergies.map(name => ({
      name,
      known: KNOWN_ALLERGIES.includes(name)
    }));

    const validatedDiets = cleanDiets.filter(d => KNOWN_DIETS.includes(d));

    res.status(200).json({
      allergies: validatedAllergies,
      dietPreferences: validatedDiets,
      dislikes: cleanDislikes
    });

  } catch (error) {
    console.log('Failed to get user input', error);
    res.status(500).json({ error: "Groq API failed" });
  }
};

const getIngredientsByPreferences = async (req, res) => {
  try {
    const { ingredients, preferences } = req.body;

    if (!ingredients || Object.keys(ingredients).length === 0) {
      return res.status(400).json({ error: "Ingredients are required" });
    }

    if (!preferences) {
      return res.status(400).json({ error: "Preferences are required" });
    }


    const systemMessage = `
Given the following ingredients and user dietary preferences, allergies, and disliked ingredients,
- Remove or replace any ingredients that conflict with allergies or dislikes.
- Suggest alternative ingredients if needed to fit diet preferences.
- Normalize ingredient names and quantities.
- Return ONLY a JSON object with key "ingredients" whose value is an object of ingredient names (lowercase) and quantities (integers).
  
Ingredients:
${JSON.stringify(ingredients, null, 2)}

User Preferences:
Allergies: ${preferences.allergies.map(a => a.name).join(", ") || "none"}
Diet preferences: ${preferences.dietPreferences.join(", ") || "none"}
Dislikes: ${preferences.dislikes.join(", ") || "none"}

Respond ONLY with the JSON object as described. No extra text or markdown.
`;

    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: [
        { role: "system", content: systemMessage },
      ],
    });

    let rawReply = completion.choices[0]?.message?.content.trim();

    if (rawReply.startsWith("```") && rawReply.endsWith("```")) {
      rawReply = rawReply.slice(3, -3).trim();
    }

    const jsonMatch = rawReply.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error("No JSON object found in model response:", rawReply);
      return res.status(500).json({ error: "Model response did not contain valid JSON." });
    }

    let parsed;
    try {
      parsed = JSON.parse(jsonMatch[0]);
      if (typeof parsed !== "object" || Array.isArray(parsed) || !parsed.ingredients) {
        throw new Error("Response is not a valid ingredients JSON object.");
      }
    } catch (err) {
      console.error("Failed to parse JSON:", jsonMatch[0]);
      return res.status(500).json({ error: "Invalid model response JSON." });
    }

    res.status(200).json(parsed);

  } catch (error) {
    console.error("Groq API error:", error);
    res.status(500).json({ error: "Groq API failed" });
  }
};


module.exports = { sendGroqMessage, userPreferences, getIngredientsByPreferences };
