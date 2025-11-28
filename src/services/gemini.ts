import { GoogleGenAI, Chat } from "@google/genai";
import { SYSTEM_PROMPT } from "../constants";

let ai: GoogleGenAI | null = null;
let chatSession: Chat | null = null;

const initializeAI = () => {
  if (!ai) {
    // Note: Using NEXT_PUBLIC_ prefix for client-side access
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      console.error("NEXT_PUBLIC_GEMINI_API_KEY is missing from environment variables.");
    }
    ai = new GoogleGenAI({ apiKey: apiKey || "" });
  }
  return ai;
};

export const startChat = () => {
  const client = initializeAI();
  chatSession = client.chats.create({
    model: 'gemini-2.0-flash', // Updated to latest stable flash model
    config: {
      systemInstruction: SYSTEM_PROMPT,
    },
  });
  return chatSession;
};

export const sendMessageStream = async function* (message: string) {
  if (!chatSession) {
    startChat();
  }
  if (!chatSession) {
    throw new Error("Failed to initialize chat session");
  }

  const result = await chatSession.sendMessageStream({ message });
  
  for await (const chunk of result) {
    if (chunk.text) {
      yield chunk.text;
    }
  }
};