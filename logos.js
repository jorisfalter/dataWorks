// Logo Downloader using SimpleIcons (Free, SVG, Transparent)
// This script fetches transparent SVG logos for your brands and downloads them locally

const fs = require("fs");
const path = require("path");
const https = require("https");

const brands = [
  "Notion",
  "Make.com",
  "Apify",
  "n8n",
  "Python",
  "Node.js",
  "React",
  "Next.js",
  "ChatGPT",
  "Claude",
  "Llama",
  "HubSpot",
  "Zapier",
  "ClickUp",
  "ElevenLabs",
  "Tally",
  "Slack",
  "Shopify",
  "Google Workspace",
  "ProductHunt",
  "HackerNews",
  "Upwork",
];

// SimpleIcons slug mappings (transparent SVG logos)
const iconMappings = {
  Notion: "notion",
  "Make.com": "make",
  Apify: "apify",
  n8n: "n8n",
  Python: "python",
  "Node.js": "nodedotjs",
  React: "react",
  "Next.js": "nextdotjs",
  ChatGPT: "openai",
  Claude: "anthropic",
  Llama: "meta",
  HubSpot: "hubspot",
  Zapier: "zapier",
  ClickUp: "clickup",
  ElevenLabs: "elevenlabs",
  Tally: "tally",
  Slack: "slack",
  Shopify: "shopify",
  "Google Workspace": "google",
  ProductHunt: "producthunt",
  HackerNews: "ycombinator",
  Upwork: "upwork",
};

// Create logos directory if it doesn't exist
const logosDir = path.join(__dirname, "images", "logos");
if (!fs.existsSync(logosDir)) {
  fs.mkdirSync(logosDir, { recursive: true });
}

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const options = {
      rejectUnauthorized: false, // Allow self-signed certificates
    };

    https
      .get(url, options, (response) => {
        // Follow redirects
        if (response.statusCode === 301 || response.statusCode === 302) {
          downloadImage(response.headers.location, filepath)
            .then(resolve)
            .catch(reject);
          return;
        }

        if (response.statusCode === 200) {
          const fileStream = fs.createWriteStream(filepath);
          response.pipe(fileStream);
          fileStream.on("finish", () => {
            fileStream.close();
            resolve(true);
          });
          fileStream.on("error", (err) => {
            fs.unlink(filepath, () => {}); // Delete partial file
            reject(err);
          });
        } else {
          reject(new Error(`Failed to download: ${response.statusCode}`));
        }
      })
      .on("error", reject);
  });
}

async function downloadLogos() {
  console.log("🚀 Starting logo download...\n");
  console.log(`📁 Saving logos to: ${logosDir}\n`);

  const results = [];
  let successCount = 0;
  let failCount = 0;

  for (const brand of brands) {
    const slug = iconMappings[brand];
    const simpleIconUrl = `https://cdn.simpleicons.org/${slug}`;

    // Create a clean filename from the brand name
    const filename = brand.toLowerCase().replace(/[^a-z0-9]/g, "-") + ".svg";
    const filepath = path.join(logosDir, filename);

    try {
      await downloadImage(simpleIconUrl, filepath);

      results.push({
        brand,
        slug,
        logoUrl: simpleIconUrl,
        filepath: filepath,
        filename: filename,
        status: "✅",
      });

      console.log(`✅ ${brand} -> ${filename}`);
      successCount++;
    } catch (error) {
      results.push({
        brand,
        slug,
        logoUrl: simpleIconUrl,
        status: "❌",
        error: error.message,
      });
      console.log(`❌ ${brand} -> Failed: ${error.message}`);
      failCount++;
    }
  }

  console.log("\n" + "=".repeat(60));
  console.log("📊 DOWNLOAD SUMMARY:");
  console.log("=".repeat(60));
  console.log(`✅ Successfully downloaded: ${successCount}`);
  console.log(`❌ Failed: ${failCount}`);
  console.log(`📁 Saved to: ${logosDir}\n`);

  return results;
}

// Run the script
downloadLogos()
  .then((results) => {
    const successfulDownloads = results.filter((r) => r.status === "✅");
    console.log(
      "\n✨ Done! " +
        successfulDownloads.length +
        " logos downloaded and ready to use."
    );
    console.log("💡 You can find them in the images/logos/ directory");
  })
  .catch((error) => {
    console.error("❌ Error:", error.message);
  });
