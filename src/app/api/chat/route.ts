import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText, CoreMessage } from 'ai';
import { retrieveContext } from '@/lib/rag';

// ⚠️ CRITICAL: Must be 'nodejs' to talk to Docker
export const runtime = 'nodejs';

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

export async function POST(req: Request) {
  const { messages }: { messages: CoreMessage[] } = await req.json();
  const lastUserMessage = messages[messages.length - 1];
  
  // 1. Retrieve data from our database
  let context = "";
  if (lastUserMessage.role === 'user') {
    console.log("🔍 Searching knowledge base for:", lastUserMessage.content);
    // @ts-ignore
    context = await retrieveContext(lastUserMessage.content);
  }

  // 2. Add the data to the System Prompt
  const systemPrompt = `You are C3, an expert AI career counselor for Indian students.
  
  **KNOWLEDGE BASE (Facts you must use):**
  ${context ? `Use this specific information to answer:\n${context}` : "No specific database information found. Use general knowledge."}
  
  **INSTRUCTIONS:**
  - If the knowledge base lists specific Exams or Colleges, you MUST mention them.
  - Keep the tone encouraging and helpful.
  - Format with Markdown (Bold key terms).
  `;

  // 3. Generate Answer
  const result = await streamText({
    model: google('models/gemini-1.5-flash'),
    system: systemPrompt,
    messages,
  });

  return result.toDataStreamResponse();
}