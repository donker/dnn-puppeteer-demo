const common = require("./common");

exports.openSiteSettings = async function(page) {
  await openMenu(page, "Settings", "SiteSettings", "#SiteSettings-panel");
};
exports.openUsers = async function(page) {
  await openMenu(page, "Manage", "Users", "#Users-panel");
};
exports.openRoles = async function(page) {
  await openMenu(page, "Manage", "Roles", "#Roles-panel");
};

openMenu = async function(page, menu, panel, testSelector) {
  await page.waitForSelector("#personaBar-iframe");
  const frames = await page.frames();
  const personaBar = frames.find(f => f.name() === "personaBar-iframe");
  if (personaBar) {
    var test = await personaBar.$(testSelector);
    if (test) {
      if (common.isVisible(personaBar, testSelector)) {
        return;
      }
    }
    await personaBar.waitForSelector("#" + menu + " > span.icon-loader > svg");
    await personaBar.hover("#" + menu + " > span.icon-loader > svg");
    await page.waitFor(1000);
    const btnSs = await personaBar.waitForSelector(
      "." + menu + "hovermenu li[data-path='" + panel + "']",
      { visible: true }
    );
    await btnSs.click();
    await personaBar.waitForSelector(testSelector);
  }
};

exports.closeMenu = async function(page) {
  const frames = await page.frames();
  const personaBar = frames.find(f => f.name() === "personaBar-iframe");
  if (personaBar) {
    await personaBar.click("#showsite");
    await page.waitFor(1000);
  }
};
