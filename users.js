const names = require("./names");

exports.addUser = async function(
  page,
  firstName,
  lastName,
  userName,
  email,
  authorized,
  randomPw,
  password,
  sendEmail
) {
  const frames = await page.frames();
  const personaBar = frames.find(f => f.name() === "personaBar-iframe");
  if (personaBar) {
    await personaBar.click(
      "#users-container > div > div.boilerplate-app.personaBar-mainContainer > div > div > div.dnn-persona-bar-page-header > div > button"
    );
    await personaBar.waitForSelector("div.new-user-box");
    await personaBar.click("div.new-user-box input[type='text'][tabindex='1']");
    await page.keyboard.type(firstName);
    await personaBar.click("div.new-user-box input[type='text'][tabindex='2']");
    await page.keyboard.type(lastName);
    await personaBar.click("div.new-user-box input[type='text'][tabindex='3']");
    await page.keyboard.type(userName);
    await personaBar.click("div.new-user-box input[type='text'][tabindex='4']");
    await page.keyboard.type(email);
    var switches = await personaBar.$$("div.new-user-box .dnn-switch");
    if (switches && switches.length == 2) {
      if (!authorized) {
        await switches[0].click();
      }
      if (randomPw) {
        await switches[1].click();
      } else {
        await personaBar.click(
          "div.new-user-box input[type='password'][tabindex='7']"
        );
        await page.keyboard.type(password);
        await personaBar.click(
          "div.new-user-box input[type='password'][tabindex='8']"
        );
        await page.keyboard.type(password);
      }
    }
    if (sendEmail) {
      await personaBar.click("div.email-notification-line input");
    }
    await personaBar.click("div.new-user-box button[role='primary']");
    await page.waitFor(5000); // wait for popup to fade
  }
};

exports.addRandomUser = async function(page, authorized, password) {
  var newUser = this.getRandomUserName();
  await this.addUser(
    page,
    newUser.firstName,
    newUser.lastName,
    newUser.userName,
    newUser.email,
    authorized,
    password === null,
    password,
    false
  );
};

exports.getRandomUserName = function() {
  var fn =
    Math.random() > 0.5
      ? _getName(Math.random(), "first_male")
      : _getName(Math.random(), "first_female");
  var ln = _getName(Math.random(), "last");
  return {
    firstName: fn,
    lastName: ln,
    email: fn.toLowerCase() + "@" + ln.toLowerCase() + ".name",
    userName: fn.toLowerCase().substring(0, 1) + ln.toLowerCase() + Math.floor(Math.random() * 100).toString(),
    displayName: fn + " " + ln
  };
};

var _getName = function(random, whichList) {
  var list = names[whichList];
  var idx = (random * list.length) >>> 0;
  return list[idx];
};
