import axios from "axios";

const API_KEY =
  process.env.EXPO_PUBLIC_GEMINI_API_KEY;
export const askGemini = async (
  message,
  language
) => {

  try {

    const response = await axios.post(

      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,

      {
        contents: [
          {
            parts: [
              {
                text: `
You are Aarthika AI.

You help rural women learn financial literacy.

Reply in very simple language.

Reply in ${language} language.

Question:
${message}
                `,
              },
            ],
          },
        ],
      },

      {
        headers: {
          "Content-Type": "application/json",
        },
      }

    );

    console.log("SUCCESS:", response.data);

    return response.data.candidates[0]
      .content.parts[0].text;

  } catch (error) {

    console.log(
      "REAL ERROR:",
      error.response?.data || error.message
    );

    return "AI unavailable.";

  }

};