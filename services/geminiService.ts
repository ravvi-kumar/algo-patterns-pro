import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAIExplanation = async (topic: string, specificQuestion?: string): Promise<string> => {
  try {
    const prompt = `
    You are an expert Computer Science tutor specializing in Data Structures and Algorithms.
    The user is studying the pattern: "${topic}".
    ${specificQuestion ? `The user asks: "${specificQuestion}"` : 'Please provide a concise, intuitive explanation of this pattern with a real-world analogy.'}
    
    Keep the answer clear, encouraging, and formatted in Markdown. 
    Focus on "intuition" - how to spot this pattern in a new problem.
    Do not provide full code solutions unless asked, focusing on conceptual logic.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 } // Low latency preferred for UI interactions
      }
    });

    return response.text || "I couldn't generate an explanation at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I'm having trouble connecting to the AI tutor right now. Please try again later.";
  }
};
