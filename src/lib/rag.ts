import { ChromaClient } from 'chromadb';
import { GoogleGenerativeAI } from "@google/generative-ai";


const client = new ChromaClient({ 
    path: process.env.CHROMA_DB_URL || "http://localhost:8000" 
  });
const COLLECTION_NAME = "career_c3_knowledge_base";

export async function retrieveContext(query: string) {
  try {
    // 1. Safety Check: Ensure Key exists
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) {
      console.error("❌ FATAL: API Key is missing in Next.js!");
      return ""; // Return empty context so the app doesn't crash
    }

    // 2. Generate Embedding using Google SDK
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
    
    const result = await model.embedContent(query);
    const queryEmbedding = result.embedding.values;

    // 3. Get Collection
    const collection = await client.getOrCreateCollection({
      name: COLLECTION_NAME,
      metadata: { "hnsw:space": "cosine" },
      embeddingFunction: { generate: async () => [] } // Dummy to silence warnings
    });

    // 4. Search Database
    const results = await collection.query({
      queryEmbeddings: [queryEmbedding],
      nResults: 2, // Get top 2 matches
    });

    if (!results.documents[0] || results.documents[0].length === 0) {
      return "";
    }

    // 5. Return the text found
    return results.documents[0].join("\n\n---\n\n");
  } catch (error) {
    console.error("Error querying RAG:", error);
    return "";
  }
}