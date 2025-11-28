import { GoogleGenerativeAI } from "@google/generative-ai";
import { ChromaClient } from 'chromadb';
import fs from 'fs';
import path from 'path';
import * as dotenv from 'dotenv';

// 1. Setup Environment
const envPath = path.resolve(process.cwd(), '.env.local');
dotenv.config({ path: envPath });

async function seed() {
    console.log("🚀 Starting database seeding (Direct Mode)...");

    // 2. Check Key
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) {
        console.error("❌ FATAL: No API Key found.");
        process.exit(1);
    }

    // 3. Initialize Google (Official SDK)
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "text-embedding-004" });

    // 4. Connect to Chroma (Port 8000)
    const client = new ChromaClient({ path: "http://localhost:8000" });
    const collectionName = "career_c3_knowledge_base";

    // Clean up old data
    try { await client.deleteCollection({ name: collectionName }); } catch (e) { }

    // Create Collection
    const collection = await client.getOrCreateCollection({
        name: collectionName,
        metadata: { "hnsw:space": "cosine" },
        embeddingFunction: { generate: async () => [] } // Dummy to silence warnings
    });

    // 5. Load Data
    const dataPath = path.join(process.cwd(), 'src', 'data', 'careers.json');
    if (!fs.existsSync(dataPath)) {
        console.error("❌ Data file not found at:", dataPath);
        process.exit(1);
    }
    const careers = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

    const ids: string[] = [];
    const documents: string[] = [];
    const embeddings: number[][] = [];

    console.log(`📦 Processing ${careers.length} career paths...`);

    for (const career of careers) {
        const content = `
      Career: ${career.title}
      Description: ${career.description}
      Exams: ${career.exams.join(", ")}
      Colleges: ${career.top_colleges.join(", ")}
    `.trim();

        // DIRECT CALL TO GOOGLE
        try {
            const result = await model.embedContent(content);
            const vector = result.embedding.values; // Get raw numbers

            ids.push(career.id);
            documents.push(content);
            embeddings.push(vector);
            process.stdout.write('.');
        } catch (err) {
            console.error("\n❌ Google Error:", err);
            process.exit(1);
        }
    }

    // 6. Save
    await collection.add({ ids, embeddings, documents });
    console.log("\n✅ Database seeded successfully!");
}

seed().catch(console.error);