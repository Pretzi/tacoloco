const fs = require("fs");
const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "..", ".env.local") });

const API_KEY = process.env.NANO_BANANA_API_KEY;
const MODEL = "gemini-2.0-flash-exp-image-generation";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;
const OUTPUT_DIR = path.resolve(__dirname, "..", "public/images/avatars");

const AVATARS = [
  {
    filename: "sarah.png",
    prompt: "Professional headshot portrait of a friendly young woman in her late 20s with light brown hair, warm smile, natural makeup. Soft studio lighting, neutral blurred background. Square crop, high resolution, photorealistic. No text.",
  },
  {
    filename: "james.png",
    prompt: "Professional headshot portrait of a friendly man in his early 30s with short dark hair and light stubble, warm genuine smile. Soft studio lighting, neutral blurred background. Square crop, high resolution, photorealistic. No text.",
  },
  {
    filename: "maria.png",
    prompt: "Professional headshot portrait of a friendly woman in her mid 30s with dark wavy hair, warm smile, minimal jewelry. Soft studio lighting, neutral blurred background. Square crop, high resolution, photorealistic. No text.",
  },
  {
    filename: "alex.png",
    prompt: "Professional headshot portrait of a friendly young man in his late 20s with medium-length brown hair, casual look, genuine smile. Soft studio lighting, neutral blurred background. Square crop, high resolution, photorealistic. No text.",
  },
  {
    filename: "chris.png",
    prompt: "Professional headshot portrait of a friendly man in his early 40s with short dark hair, glasses, warm smile. Soft studio lighting, neutral blurred background. Square crop, high resolution, photorealistic. No text.",
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
  console.log(`Generating ${AVATARS.length} reviewer avatars...\n`);
  for (const item of AVATARS) {
    const dest = path.join(OUTPUT_DIR, item.filename);
    if (fs.existsSync(dest)) { console.log(`  ✓ ${item.filename} exists, skipping.`); continue; }
    process.stdout.write(`  ⏳ ${item.filename} ...`);
    try {
      const buf = await generateImage(item.prompt);
      fs.writeFileSync(dest, buf);
      console.log(` ✓ saved (${Math.round(buf.length / 1024)}KB)`);
    } catch (err) { console.log(` ✗ ${err.message}`); }
  }
  console.log("\nDone! Avatars saved to public/images/avatars/");
}
main();
