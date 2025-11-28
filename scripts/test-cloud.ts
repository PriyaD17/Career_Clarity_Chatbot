import { ChromaClient } from 'chromadb';

async function testConnection() {
    // 1. Get the URL exactly as you would on Vercel
    const url = "https://project-c3-db.onrender.com"; // <--- PASTE YOUR RENDER URL HERE
    
    console.log(`📡 Testing connection to: ${url}`);
    
    const client = new ChromaClient({ path: url });

    try {
        const start = Date.now();
        console.log("⏳ Pinging database...");
        
        // 2. Try a simple heartbeat
        const hb = await client.heartbeat();
        
        const time = (Date.now() - start) / 1000;
        console.log(`✅ Success! Response: ${JSON.stringify(hb)}`);
        console.log(`⏱️  Time taken: ${time} seconds`);
        
        if (time > 5) {
            console.warn("⚠️  WARNING: Database is very slow (sleeping?). Vercel might timeout.");
        }
    } catch (e) {
        console.error("❌ CONNECTION FAILED");
        console.error(e);
    }
}

testConnection();