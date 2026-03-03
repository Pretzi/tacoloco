const fs = require("fs");
const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "..", ".env.local") });

const API_KEY = process.env.NANO_BANANA_API_KEY;
const MODEL = "gemini-2.0-flash-exp-image-generation";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;
const OUTPUT_DIR = path.resolve(__dirname, "..", "public/images/join-us");

const IMAGES = [
  {
    filename: "hero.png",
    prompt: "Vibrant wide-angle photograph of a lively Mexican street food kitchen team working together during service. Staff in black aprons assembling tacos, laughing, high energy. Warm golden light, steam rising, colorful ingredients visible. Energetic, authentic, team-oriented atmosphere. Rich warm saturated colours. No text or watermarks. Wide 16:9 composition, editorial lifestyle photography.",
  },
  {
    filename: "team.png",
    prompt: "Vibrant candid photograph of a small diverse restaurant team (3-4 people) posing together behind a street food counter, smiling proudly. Wearing black aprons, arms around each other. Colourful Mexican food ingredients and decorations in the background. Warm golden light, authentic and inviting atmosphere. Rich saturated colours. No text or watermarks. 4:3 landscape, lifestyle photography.",
  },
  {
    filename: "vibe.png",
    prompt: "Vibrant photograph of a colourful bohemian market street similar to Kensington Market Toronto. String lights, colourful murals on brick walls, vintage signage, eclectic shops. A few people walking, warm afternoon golden sunlight. Lively, artistic, multicultural neighbourhood atmosphere. Rich saturated colours, greens, reds, yellows. No text or watermarks. 4:3 landscape, editorial travel photography.",
  },
];

async function generateImage(prompt) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseModalities: ["IMAGE", "TEXT"] },
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error?.message || JSON.stringify(data));
  const parts = data.candidates?.[0]?.content?.parts;
  if (!parts) throw new Error("No parts in response");
  for (const part of parts) {
    if (part.inlineData) return Buffer.from(part.inlineData.data, "base64");
  }
  throw new Error("No image data in response");
}

async function main() {
  if (!API_KEY || API_KEY === "your_api_key_here") {
    console.error("Set NANO_BANANA_API_KEY in .env.local");
    process.exit(1);
  }
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  console.log(`Generating ${IMAGES.length} join-us images...\n`);
  for (const item of IMAGES) {
    const dest = path.join(OUTPUT_DIR, item.filename);
    if (fs.existsSync(dest)) { console.log(`  ✓ ${item.filename} exists, skipping.`); continue; }
    process.stdout.write(`  ⏳ ${item.filename} ...`);
    try {
      const buf = await generateImage(item.prompt);
      fs.writeFileSync(dest, buf);
      console.log(` ✓ saved (${Math.round(buf.length / 1024)}KB)`);
    } catch (err) { console.log(` ✗ ${err.message}`); }
  }
  console.log("\nDone! Images saved to public/images/join-us/");
}
main();
