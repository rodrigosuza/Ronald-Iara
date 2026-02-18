import { GoogleGenAI, Type } from "@google/genai";
import { Gift } from "../types";

const generateId = () => Math.random().toString(36).substr(2, 9);

export const generateGiftIdeas = async (count: number = 5): Promise<Gift[]> => {
  if (!process.env.API_KEY) {
    console.warn("API Key not found. Returning mock data.");
    return [];
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a list of ${count} sophisticated wedding gift ideas. Return JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING, description: "Name of the gift" },
              category: { type: Type.STRING, description: "Category like Kitchen, Decor, etc." },
            },
            required: ["name", "category"],
          },
        },
      },
    });

    const data = JSON.parse(response.text || "[]");
    
    // Map to our Gift interface
    // Note: In a real app we might use AI to generate image prompts, 
    // but here we use picsum with a random seed based on name length
    return data.map((item: any, index: number) => ({
      id: generateId(),
      name: item.name,
      category: item.category,
      imageUrl: `https://picsum.photos/400/400?random=${Date.now() + index}`,
      status: 'available'
    }));

  } catch (error) {
    console.error("Error generating gifts:", error);
    return [];
  }
};