const puppeteer = require("puppeteer");
const login = require("./login");
const pb = require("./personaBar");
const users = require("./users");

async function run() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null
  });
  const page = await browser.newPage();
  await page.goto("http://www.dotnetnuke.local");
  await login.Login(page, "host", "dnnhost");
  await pb.openUsers(page);
  await page.waitFor(3000);
  await users.addRandomUser(page, true, "password");
  await users.addRandomUser(page, true, "password");
  await users.addRandomUser(page, true, "password");
  await users.addRandomUser(page, true, "password");
  await page.waitFor(3000);
  await pb.closeMenu(page);
  browser.close();
}

run();
