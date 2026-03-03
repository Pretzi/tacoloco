const fs = require("fs");
const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "..", ".env.local") });

const API_KEY = process.env.NANO_BANANA_API_KEY;
const MODEL = "gemini-2.0-flash-exp-image-generation";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;
const OUTPUT_DIR = path.resolve(__dirname, "..", "public/images/about");

const ABOUT_IMAGES = [
  {
    filename: "hero.png",
    prompt:
      "Vibrant wide-angle photograph of a bustling Mexican street food stall in a colourful urban market. Warm golden-hour sunlight, strings of papel picado banners overhead, steam rising from a grill, corn tortillas being pressed. Lively, energetic, authentic atmosphere. Rich saturated warm colors, reds, oranges, yellows. No text or watermarks. Wide 16:9 composition, editorial quality.",
  },
  {
    filename: "kitchen.png",
    prompt:
      "Vibrant close-up food photography of hands assembling fresh tacos on a busy restaurant prep station. Corn tortillas, spit-roasted al pastor being sliced from a trompo, bowls of fresh cilantro, diced onion, lime wedges, and colourful salsas. Steam and warm golden light. Rich saturated colours, energetic and appetizing. No text or watermarks. 4:3 landscape, editorial food photography.",
  },
  {
    filename: "market.png",
    prompt:
      "Vibrant street-level photograph of a colourful neighbourhood market street similar to Kensington Market Toronto. Eclectic storefronts with hand-painted signs, colourful murals, string lights, fruit stands, people walking. Warm golden afternoon light, lively and multicultural atmosphere. Rich saturated colours, reds, greens, yellows. No text or watermarks. 4:3 landscape, editorial travel photography.",
  },
  {
    filename: "community.png",
    prompt:
      "Vibrant candid photograph of a diverse group of happy friends sharing tacos at an outdoor table in a lively market setting. Laughing, eating, plates of colourful Mexican street food on the table. String lights above, warm golden light, summer vibes. Rich saturated warm colours, joyful and inviting atmosphere. No text or watermarks. 4:3 landscape, lifestyle photography.",
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

  console.log(`Generating ${ABOUT_IMAGES.length} about page images with Gemini...\n`);

  for (const item of ABOUT_IMAGES) {
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

  console.log("\nDone! Images saved to public/images/about/");
}

main();
