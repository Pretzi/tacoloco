const fs = require("fs");
const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "..", ".env.local") });

const API_KEY = process.env.NANO_BANANA_API_KEY;
const MODEL = "gemini-2.0-flash-exp-image-generation";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;
const OUTPUT_DIR = path.resolve(__dirname, "..", "public/images/menu");

const STYLE =
  "High-end restaurant menu photography, studio lighting with soft warm key light from the left, shallow depth of field f/2.8, clean matte dark slate surface, no text or watermarks, no people, overhead 45-degree angle, 1:1 square crop, rich saturated colors, editorial food styling";

const MENU_ITEMS = [
  {
    filename: "al-pastor.png",
    prompt: `${STYLE}. Two al pastor tacos on small soft corn tortillas. Spit-roasted pork marinated in achiote and guajillo chili, topped with caramelized pineapple chunks, finely diced white onion, fresh cilantro, and a drizzle of green salsa. A charred lime half sits beside them. The pork has visible char marks and glistens with juices.`,
  },
  {
    filename: "chorizo.png",
    prompt: `${STYLE}. Two chorizo tacos on soft corn tortillas. House-seasoned Mexican sausage with smoky paprika and cumin, crumbled and slightly crispy at the edges, topped with diced white onion, fresh cilantro, and a squeeze of lime. A small clay dish of red salsa sits nearby. The chorizo has a deep reddish-orange color.`,
  },
  {
    filename: "birria.png",
    prompt: `${STYLE}. Two birria tacos on crispy golden pan-fried corn tortillas with melted Oaxaca cheese visible at the edges. Filled with tender slow-braised shredded beef. Beside them a small black bowl of rich deep-red chili consommé for dipping, garnished with a few cilantro leaves and thin sliced radish. The tortillas glisten with a light sheen from the consommé.`,
  },
  {
    filename: "torta-loca.png",
    prompt: `${STYLE}. A loaded Torta Loca chorizo sandwich cut diagonally in half, stacked to show the cross-section. Crusty golden telera roll filled with crumbled chorizo, creamy refried beans, sliced ripe avocado, fresh salsa roja, shredded lettuce, and a layer of melted cheese. Wrapped partially in brown parchment paper. A few pickled jalapeño slices on the side.`,
  },
  {
    filename: "combo.png",
    prompt: `${STYLE}. A Mexican street food combo meal arranged on a dark tray. Three assorted tacos (al pastor, chorizo, birria) on corn tortillas with fresh toppings, alongside a generous portion of orange-tinted Mexican rice, creamy refried beans topped with crumbled queso fresco, and a cold Mexican glass bottle soda. Lime wedges scattered around.`,
  },
  {
    filename: "daily-specials.png",
    prompt: `${STYLE}. A generous spread of assorted Mexican street food tacos fanned out on a large dark slate board. Multiple varieties with different colorful fillings, each topped with fresh cilantro, onion, and various salsas. Scattered lime wedges, sliced radishes, and small bowls of green and red salsa around the edges. Looks abundant and inviting.`,
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

  console.log(`Generating ${MENU_ITEMS.length} menu images with Gemini...\n`);

  for (const item of MENU_ITEMS) {
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

  console.log("\nDone! Images saved to public/images/menu/");
}

main();
