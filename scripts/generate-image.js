#!/usr/bin/env node
/**
 * generate-image.js
 *
 * Generates an image with DALL-E 3 and saves it to disk.
 *
 * Usage:
 *   node scripts/generate-image.js <prompt> [output] [size] [quality]
 *
 * Arguments:
 *   prompt   Required. The image description.
 *   output   Optional. Destination path (default: public/images/generated.png)
 *   size     Optional. 1024x1024 | 1536x1024 | 1024x1536  (default: 1536x1024)
 *   quality  Optional. low | medium | high | auto  (default: high)
 *
 * Examples:
 *   node scripts/generate-image.js "moody overhead taco shot" public/images/hero-bg.png
 *   node scripts/generate-image.js "birria close-up" public/images/menu/birria-new.png 1024x1024 medium
 */

const path = require("path");
const fs = require("fs");
const https = require("https");
const http = require("http");

// Load env — try .env.local first (Next.js convention), fall back to .env
const root = path.resolve(__dirname, "..");
[".env.local", ".env"].forEach((file) => {
  const envPath = path.join(root, file);
  if (fs.existsSync(envPath)) {
    require("dotenv").config({ path: envPath });
  }
});

const { OpenAI } = require("openai");

// ─── helpers ──────────────────────────────────────────────────────────────────

function downloadUrl(url, dest) {
  return new Promise((resolve, reject) => {
    const proto = url.startsWith("https") ? https : http;
    const file = fs.createWriteStream(dest);
    proto
      .get(url, (res) => {
        if (res.statusCode !== 200) {
          file.close();
          fs.unlink(dest, () => {});
          return reject(new Error(`Download failed: HTTP ${res.statusCode}`));
        }
        res.pipe(file);
        file.on("finish", () => file.close(resolve));
      })
      .on("error", (err) => {
        file.close();
        fs.unlink(dest, () => {});
        reject(err);
      });
  });
}

// ─── main ─────────────────────────────────────────────────────────────────────

async function main() {
  const [, , prompt, output, size, quality] = process.argv;

  if (!prompt) {
    console.error(
      [
        "",
        "  Usage:  node scripts/generate-image.js <prompt> [output] [size] [quality]",
        "",
        "  prompt   Required. Image description.",
        "  output   Destination path  (default: public/images/generated.png)",
        "  size     1024x1024 | 1792x1024 | 1024x1792  (default: 1792x1024)",
        "  quality  standard | hd  (default: hd)",
        "",
        "  Example:",
        '  node scripts/generate-image.js "moody overhead taco shot" public/images/hero-bg.png',
        "",
      ].join("\n")
    );
    process.exit(1);
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error("Error: OPENAI_API_KEY not found in .env or .env.local");
    process.exit(1);
  }

  const destPath = path.resolve(root, output || "public/images/generated.png");
  const destSize = size || "1536x1024";
  const destQuality = quality || "high";

  // Ensure the destination directory exists
  fs.mkdirSync(path.dirname(destPath), { recursive: true });

  const client = new OpenAI({ apiKey });

  console.log("\n  ⟶  Model:   gpt-image-1");
  console.log(`  ⟶  Size:    ${destSize}`);
  console.log(`  ⟶  Quality: ${destQuality}`);
  console.log(`  ⟶  Output:  ${path.relative(root, destPath)}`);
  console.log(`\n  Prompt: "${prompt}"\n`);
  console.log("  Generating…");

  const response = await client.images.generate({
    model: "gpt-image-1",
    prompt,
    n: 1,
    size: destSize,
    quality: destQuality,
  });

  const item = response.data[0];

  // gpt-image-1 returns base64 by default; DALL-E returns a URL
  if (item.b64_json) {
    fs.writeFileSync(destPath, Buffer.from(item.b64_json, "base64"));
  } else if (item.url) {
    console.log("  Downloading…");
    await downloadUrl(item.url, destPath);
  } else {
    throw new Error("No image data in response");
  }

  console.log(`\n  ✓ Saved to: ${path.relative(root, destPath)}\n`);
}

main().catch((err) => {
  console.error("\n  Error:", err.message || err);
  process.exit(1);
});
