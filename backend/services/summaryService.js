import axios from "axios";

export const generateMeetingSummary = async (transcript) => {
    try {
        const response = await axios.post(
            "https://router.huggingface.co/v1/chat/completions",
            {
                model: "Qwen/Qwen2.5-7B-Instruct",

                messages: [
                    {
                        role: "system",
                        content: `You are an expert meeting assistant.

Return ONLY valid JSON.

The format MUST be:

{
  "summary": "string",
  "keyPoints": [
    "string"
  ],
  "actionItems": [
    {
      "task": "string",
      "owner": "string",
      "deadline": "string"
    }
  ]
}

Rules:
- Return ONLY JSON.
- No markdown.
- No explanation.
- If owner is unknown use "Not specified".
- If deadline is unknown use "Not specified".`
                    },
                    {
                        role: "user",
                        content: transcript
                    }
                ],

                max_tokens: 800,
                temperature: 0.3
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.HF_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        const text = response.data.choices[0].message.content;

        // Remove markdown if the model returns it
        const cleanText = text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        try {
            return JSON.parse(cleanText);
        } catch {
            console.log("Could not parse JSON. Raw response:");
            console.log(cleanText);

            return {
                summary: cleanText,
                keyPoints: [],
                actionItems: [],
            };
        }

    } catch (error) {

        console.error("========== HUGGINGFACE ERROR ==========");

        if (error.response) {
            console.error(error.response.data);
        } else {
            console.error(error.message);
        }

        throw new Error("Failed to generate meeting summary.");
    }
};