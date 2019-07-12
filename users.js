var faker = require('faker');

const elements = {
  addUserBtn:
    "#users-container > div > div.boilerplate-app.personaBar-mainContainer > div > div > div.dnn-persona-bar-page-header > div > button",
  addUserPanel: "div.new-user-box",
  firstNameTextBox: "div.new-user-box input[type='text'][tabindex='1']",
  lastNameTextBox: "div.new-user-box input[type='text'][tabindex='2']",
  userNameTextBox: "div.new-user-box input[type='text'][tabindex='3']",
  emailTextBox: "div.new-user-box input[type='text'][tabindex='4']",
  passwordTextBox: "div.new-user-box input[type='password'][tabindex='7']",
  passwordConfirmTextBox: "div.new-user-box input[type='password'][tabindex='8']",
  switches: "div.new-user-box .dnn-switch",
  emailNotificationCheckbox: "div.email-notification-line input",
  saveNewUserBtn: "div.new-user-box button[role='primary']"
};

exports.addUser = async function (
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
    await personaBar.click(elements.addUserBtn);
    await personaBar.waitForSelector(elements.addUserPanel);
    await personaBar.click(elements.firstNameTextBox);
    await page.keyboard.type(firstName);
    await personaBar.click(elements.lastNameTextBox);
    await page.keyboard.type(lastName);
    await personaBar.click(elements.userNameTextBox);
    await page.keyboard.type(userName);
    await personaBar.click(elements.emailTextBox);
    await page.keyboard.type(email);
    var switches = await personaBar.$$(elements.switches);
    if (switches && switches.length == 2) {
      if (!authorized) {
        await switches[0].click();
      }
      if (randomPw) {
        await switches[1].click();
      } else {
        await personaBar.click(elements.passwordTextBox);
        await page.keyboard.type(password);
        await personaBar.click(elements.passwordConfirmTextBox);
        await page.keyboard.type(password);
      }
    }
    if (sendEmail) {
      await personaBar.click(elements.emailNotificationCheckbox);
    }
    await personaBar.click(elements.saveNewUserBtn);
    await page.waitFor(5000); // wait for popup to fade
  }
};

exports.addRandomUsers = async function (page, nrUsers, password) {
  for (var i = 0; i < nrUsers; i++) {
    await this.addRandomUser(page, true, password);
  }
};

exports.addRandomUser = async function (page, authorized, password) {
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

exports.getRandomUserName = function () {
  var res = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName()
  }
  res.email = res.firstName.toLowerCase() + "@" + res.lastName.toLowerCase() + ".name";
  res.userName = res.firstName.toLowerCase().substring(0, 1) +
    res.lastName.toLowerCase() +
    Math.floor(Math.random() * 100).toString();
  res.displayName = res.firstName + " " + res.lastName;
  return res;
};

var _getName = function (random, whichList) {
  var list = names[whichList];
  var idx = (random * list.length) >>> 0;
  return list[idx];
};
