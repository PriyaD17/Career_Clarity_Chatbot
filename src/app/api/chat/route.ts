import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText } from 'ai';

export const runtime = 'nodejs';

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: google('gemini-1.5-flash'),
    system: `You are C3, an expert AI career counselor for Indian students. 
    Your goal is to help students who finished 10th or 12th find career paths.
    Focus on Indian exams (JEE, NEET, CUET, CLAT), colleges, and streams.
    Be encouraging and format your answers with Markdown (bolding and lists).`,
    messages,
  });

  return result.toDataStreamResponse();
}