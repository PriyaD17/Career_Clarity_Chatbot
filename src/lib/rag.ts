import { GoogleGenerativeAI } from "@google/generative-ai";
import { Pinecone } from '@pinecone-database/pinecone';

export async function retrieveContext(query: string) {
  try {
    const googleKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    const pineconeKey = process.env.PINECONE_API_KEY;

    if (!googleKey || !pineconeKey) {
      console.error("❌ Missing Keys in environment");
      return "";
    }

    // 1. Generate Query Embedding
    const genAI = new GoogleGenerativeAI(googleKey);
    const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
    const result = await model.embedContent(query);
    const queryVector = result.embedding.values;

    // 2. Query Pinecone
    const pinecone = new Pinecone({ apiKey: pineconeKey });
    const index = pinecone.index("career-c3");

    const searchResponse = await index.namespace("ns1").query({
      vector: queryVector,
      topK: 2,
      includeMetadata: true, // Crucial: Ask Pinecone to give back the text
    });

    // 3. Extract Text
    if (searchResponse.matches.length === 0) {
      return "";
    }

    return searchResponse.matches
      .map((match) => match.metadata?.text)
      .filter((text) => text !== undefined)
      .join("\n\n---\n\n");

  } catch (error) {
    console.error("Error querying Pinecone:", error);
    return "";
  }
}