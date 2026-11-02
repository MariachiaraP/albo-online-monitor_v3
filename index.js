import puppeteer from "puppeteer-core";

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

async function checkAlbo() {
  console.log("Launching Chromium...");

  const browser = await puppeteer.launch({
    headless: "new",
    executablePath: "/usr/bin/chromium",
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const page = await browser.newPage();
  console.log("Navigating to Spaggiari...");

  await page.goto("https://web.spaggiari.eu/sdg2/AlboOnline/mnit0004", {
    waitUntil: "networkidle0"
  });

  const html = await page.content();
  await browser.close();

  console.log("Scraping completed.");

  const match = html.match(/<div class="albo-item">([\s\S]*?)<\/div>/);
  const latest = match ? match[1].trim() : "Nessun atto trovato";

  const msg = encodeURIComponent("🔔 Nuovo controllo Albo Online:\n\n" + latest);

  console.log("Sending Telegram message...");

  await fetch(
    `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${msg}`
  );

  console.log("Done.");
}

checkAlbo();
