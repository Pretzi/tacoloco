const fs = require("fs");
const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "..", ".env.local") });

const API_KEY = process.env.NANO_BANANA_API_KEY;
const MODEL = "gemini-2.0-flash-exp-image-generation";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;
const OUTPUT_DIR = path.resolve(__dirname, "..", "public/images/catering");

const CATERING_IMAGES = [
  {
    filename: "hero.png",
    prompt:
      "Vibrant wide-angle photograph of a large Mexican street food catering setup at an outdoor event. Long table with colourful Mexican papel picado decorations overhead, trays of tacos, bowls of salsa, guacamole, rice and beans laid out buffet-style. Warm golden sunset lighting, festive party atmosphere, people mingling in the background blurred. Rich saturated warm colours, reds, oranges, greens. No text or watermarks. Wide 16:9 composition, editorial event photography.",
  },
  {
    filename: "spread.png",
    prompt:
      "Vibrant overhead food photography of a Mexican catering spread on a large rustic wooden table. Platters of assorted tacos (al pastor, birria, chorizo), a tray of tortas cut in halves, bowls of Mexican rice, refried beans with queso fresco, fresh guacamole, pico de gallo, multiple colourful salsas, stacks of warm corn tortillas wrapped in cloth, scattered lime wedges and fresh cilantro. Rich saturated colours, warm lighting, abundant and inviting. No text or watermarks. 4:3 landscape, editorial food photography.",
  },
  {
    filename: "event.png",
    prompt:
      "Vibrant photograph of a professional catering team serving Mexican street food at an elegant outdoor corporate event. A chef in black apron assembling tacos at a live cooking station with a trompo visible. Guests in background holding plates and smiling. String lights, warm evening golden hour light, modern minimalist setup with colourful food as the centrepiece. Lively and professional atmosphere. Rich warm colours. No text or watermarks. 4:3 landscape, lifestyle event photography.",
  },
];

async function generateImage(prompt) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseModalities: ["IMAGE", "TEXT"],
      },
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error?.message || JSON.stringify(data));
  }

  const parts = data.candidates?.[0]?.content?.parts;
  if (!parts) throw new Error("No parts in response");

  for (const part of parts) {
    if (part.inlineData) {
      return Buffer.from(part.inlineData.data, "base64");
    }
  }

  throw new Error("No image data in response");
}

async function main() {
  if (!API_KEY || API_KEY === "your_api_key_here") {
    console.error("Set NANO_BANANA_API_KEY in .env.local before running this script.");
    process.exit(1);
  }

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  console.log(`Generating ${CATERING_IMAGES.length} catering images with Gemini...\n`);

  for (const item of CATERING_IMAGES) {
    const dest = path.join(OUTPUT_DIR, item.filename);

    if (fs.existsSync(dest)) {
      console.log(`  ✓ ${item.filename} already exists, skipping.`);
      continue;
    }

    process.stdout.write(`  ⏳ ${item.filename} ...`);

    try {
      const imageBuffer = await generateImage(item.prompt);
      fs.writeFileSync(dest, imageBuffer);
      console.log(` ✓ saved (${Math.round(imageBuffer.length / 1024)}KB)`);
    } catch (err) {
      console.log(` ✗ ${err.message}`);
    }
  }

  console.log("\nDone! Images saved to public/images/catering/");
}

main();
