const puppeteer = require("puppeteer");
const login = require("./login");
const pb = require("./personaBar");
const users = require("./users");
const roles = require("./roles");

let page;
let browser;
const width = 1920;
const height = 1080;

let newUser = users.getRandomUser();

jest.setTimeout(100000);

beforeAll(async () => {
    browser = await puppeteer.launch({
        headless: false,
        args: [`--window-size=${width},${height}`]
    });
    page = await browser.newPage();
    await page.setViewport({ width, height });
    await page.goto("http://custom/DNN940A");
});
afterAll(() => {
    browser.close();
});

describe("Add User", () => {
    test("Admin can add a user", async () => {
        await login.login(page, "host", "dnnhost1");
        await pb.openUsers(page);
        await users.addUser(page, newUser.firstName, newUser.lastName, newUser.userName, newUser.email, true, false, "password", false);
        var uname = await users.findUser(page, newUser.userName);
        expect(uname).toEqual(newUser.userName);
        await page.waitFor(3000);
        await pb.closeMenu(page);
        await login.logout(page);
    }, 160000);
    test("Added user can log in", async () => {
        await login.login(page, newUser.userName, "password");
        const dispName = await login.currentUserDisplayname(page);
        expect(dispName).toEqual(newUser.displayName);
        await login.logout(page);
    }, 160000);
});


