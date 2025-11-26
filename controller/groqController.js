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




const userPreferences = async (req, res) => {
  try {
    const { message, selectedAllergies = [], selectedDiets = [] } = req.body;

    if (!message) {
      return res.status(400).send({ success: false, message: "Message is required" });
    }


    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: [
        {
          role: "system",
          content: `
Extract ingredients that the user dislikes from their message.
- Normalize all ingredient names to lowercase and singular form.
- Return a JSON object with key "dislikes" and its value as an array of strings.
- Respond ONLY with the JSON object.
`
        },
        { role: "user", content: message }
      ],
    });

    let rawReply = completion.choices[0]?.message?.content.trim();
    if (rawReply.startsWith("```") && rawReply.endsWith("```")) {
      rawReply = rawReply.slice(3, -3).trim();
    }

    let dislikes = [];
    try {
      const parsed = JSON.parse(rawReply);
      if (Array.isArray(parsed.dislikes)) {
        dislikes = parsed.dislikes.map(d => d.toLowerCase());
      }
    } catch (err) {
      console.error("Failed to parse Groq dislikes:", rawReply);
    }

    res.status(200).json({
      allergies: selectedAllergies.map(name => ({ name, known: KNOWN_ALLERGIES.includes(name) })),
      dietPreferences: selectedDiets.filter(d => KNOWN_DIETS.includes(d)),
      dislikes
    });

  } catch (error) {
    console.error('Error in userPreferences', error);
    res.status(500).json({ error: "Failed to process preferences" });
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
