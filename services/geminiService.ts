import { GoogleGenAI } from "@google/genai";

const getAiClient = () => {
  // NOTE: In a real app, this key comes from env. 
  // For this demo structure, we assume process.env.API_KEY is available or handled by the environment.
  // We use a fallback if not present for safety in dev, but prompt instructions say rely on process.env.
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const analyzeDocumentForFraud = async (docName: string, docType: string, mockContentContext: string): Promise<{ status: 'Approved' | 'Flagged', reason: string }> => {
  try {
    const ai = getAiClient();
    
    // Simulating document content analysis. In a real app, we'd OCR the doc or send text.
    const prompt = `
      You are a senior compliance officer for a commodities trading platform. 
      Analyze the following document metadata and context for potential fraud or inconsistencies.
      
      Document Name: ${docName}
      Document Type: ${docType}
      Context/Extracted Text Summary: ${mockContentContext}
      
      Rules:
      1. Check if the context mentions "expired", "mismatch", or "suspicious".
      2. If it seems valid, return status "Approved".
      3. If suspicious, return status "Flagged".
      4. Provide a short, professional reason.

      Return ONLY a JSON object: { "status": "Approved" | "Flagged", "reason": "string" }
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    return JSON.parse(text);

  } catch (error) {
    console.error("AI Analysis failed:", error);
    // Fallback if API fails or key is missing
    return { status: 'Flagged', reason: 'AI Service unavailable for automated check. Manual review required.' };
  }
};