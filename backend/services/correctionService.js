import axios from "axios";

export const correctTranscript = async (transcript, context = {}) => {
    try {

        const {
            participants = "",
            organization = "",
            meetingTopic = "",
        } = context;

        const response = await axios.post(
            "https://router.huggingface.co/v1/chat/completions",
            {
                model: "Qwen/Qwen2.5-7B-Instruct",

                messages: [
                    {
                        role: "system",
                        content: `
You are an expert speech-to-text transcript editor.

Your goal is to improve transcript quality WITHOUT changing the meaning.

Rules:

• Fix grammar.
• Fix punctuation.
• Fix capitalization.
• Split long sentences naturally.
• Remove unnecessary filler words only if meaning stays identical.
• Preserve every piece of information.
• Do NOT summarize.
• Do NOT rewrite sentences.
• Return ONLY the corrected transcript.

For proper nouns:

• If the provided meeting context contains participant names, organizations or meeting topics, use that information to resolve obvious speech recognition mistakes.

• NEVER invent new names.

• If you are not confident, keep the original text.

Examples:

Transcript:
hello everyone my name is devanshu nirmal

Output:
Hello everyone, my name is Devanshu Nirmal.

Transcript:
today we are discussing ml

Output:
Today we are discussing ML.
`
                    },
                    {
                        role: "user",
                        content: `
Meeting Context

Participants:
${participants || "Not provided"}

Organization:
${organization || "Not provided"}

Meeting Topic:
${meetingTopic || "Not provided"}

--------------------------------

Transcript

${transcript}
`
                    }
                ],

                temperature: 0,

                max_tokens: 2500
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.HF_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        return response.data.choices[0].message.content.trim();

    } catch (error) {

        console.error("========== TRANSCRIPT CORRECTION ERROR ==========");

        if (error.response) {
            console.error(error.response.data);
        } else {
            console.error(error.message);
        }

        return transcript;
    }
};