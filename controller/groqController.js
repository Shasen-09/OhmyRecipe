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

Return only a JSON object with a single key "ingredients", whose value is another JSON object where:
- keys are ingredient names in lowercase,
- values are quantities as integers.

If quantity is missing, assume 1.

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

module.exports = { sendGroqMessage };
