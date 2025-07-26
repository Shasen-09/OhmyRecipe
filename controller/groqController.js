const Groq = require("groq-sdk");
const groq = new Groq({ apiKey: process.env.GROQ_API });

const sendGroqMessage = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const completion = await groq.chat.completions.create({
      model: "llama3-70b-8192",
      messages: [
        {
          role: "system",
          content: `Extract ingredients and their quantities from the user's message.

- Correct spelling mistakes in ingredient names.
- Normalize ingredient names to their most common form (e.g., "tomatos" → "tomatoes", "cucomber" → "cucumber").
- Return only a JSON object with a single key "ingredients", whose value is another JSON object where:
  - keys are corrected, normalized ingredient names in lowercase,
  - values are quantities as integers.
- If quantity is missing, assume 1.

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
    console.error("Groq API error:", error);
    res.status(500).json({ error: "Groq API failed" });
  }
};


const KNOWN_ALLERGIES = [
  "gluten", "peanuts", "tree nuts", "dairy", "soy", "eggs",
  "shellfish", "fish", "sesame", "wheat", "lactose"
];

const KNOWN_DIETS = [
  "vegetarian", "vegan", "pescatarian", "keto", "low-carb",
  "paleo", "gluten-free", "dairy-free", "halal", "kosher"
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
      model: "llama3-70b-8192",
      messages: [
        {
          role: "system",
          content: `Extract allergies, diet userPreferences, and ingredients the user dislikes from their message.
          - Infer diets from phrases like "no animal products" → "vegan", or "avoid carbs" → "low-carb".
          - Normalize all values to lowercase and common dietary terms (e.g., "vegaan" → "vegan").
- Return a JSON object with keys: "allergies", "dietPreferences", "dislikes".
- Each key's value must be an array of lowercase strings.
- If nothing is mentioned, return an empty array for that key.
- Respond ONLY with the JSON object. No extra text or markdown formatting.`

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

module.exports = { sendGroqMessage, userPreferences };
