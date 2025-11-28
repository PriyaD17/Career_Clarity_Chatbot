import { GoogleGenerativeAI } from "@google/generative-ai";
import { Pinecone } from '@pinecone-database/pinecone';
import fs from 'fs';
import path from 'path';
import * as dotenv from 'dotenv';

// 1. Setup Env
const envPath = path.resolve(process.cwd(), '.env.local');
dotenv.config({ path: envPath });

async function seed() {
    console.log("🚀 Starting Pinecone seeding...");

    // 2. Validate Keys
    const googleKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    const pineconeKey = process.env.PINECONE_API_KEY;

    if (!googleKey || !pineconeKey) {
        console.error("❌ FATAL: Missing API Keys (Check .env.local)");
        process.exit(1);
    }

    // 3. Initialize Clients
    const genAI = new GoogleGenerativeAI(googleKey);
    const googleModel = genAI.getGenerativeModel({ model: "text-embedding-004" });
    
    const pinecone = new Pinecone({ apiKey: pineconeKey });
    const index = pinecone.index("career-c3"); // Your index name

    // 4. Load Data
    const dataPath = path.join(process.cwd(), 'src', 'data', 'careers.json');
    const careers = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

    console.log(`📦 Processing ${careers.length} career paths...`);
    const records = [];

    for (const career of careers) {
        const content = `
          Career: ${career.title}
          Description: ${career.description}
          Exams: ${career.exams.join(", ")}
          Colleges: ${career.top_colleges.join(", ")}
        `.trim();

        // Generate Embedding
        const result = await googleModel.embedContent(content);
        const vector = result.embedding.values;

        // Prepare for Pinecone
        records.push({
            id: career.id,
            values: vector,
            metadata: {
                text: content // We store the text inside metadata to retrieve it later
            }
        });
        process.stdout.write('.');
    }

    // 5. Upload Batch
    // Pinecone likes batches (Up to 100 at a time is safe)
    await index.namespace("ns1").upsert(records);

    console.log("\n✅ Database seeded successfully to Pinecone!");
}

seed().catch(console.error);