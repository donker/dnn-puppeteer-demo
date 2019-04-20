exports.openSiteSettings = async function(page) {
    await openMenu(page, "Settings", "SiteSettings", "#siteSettings-container > div > div > div.dnn-persona-bar-page.show.undefined > div.dnn-grid-cell.dnn-persona-bar-page-body > div > div > ul");
}
exports.openUsers = async function(page) {
    await openMenu(page, "Manage", "Users", "#users-container > div > div.boilerplate-app.personaBar-mainContainer > div > div > div.dnn-grid-cell.dnn-persona-bar-page-body > div.dnn-grid-cell.persona-bar-page-body > div.dnn-grid-cell._30Ywg8MZnSyy25yOY32zZ2 > div.dnn-grid-cell.header-row > div:nth-child(2) > h6");
}

openMenu = async function(page, menu, panel, testSelector) {
  await page.waitForSelector("#personaBar-iframe");
  const frames = await page.frames();
  const personaBar = frames.find(f => f.name() === "personaBar-iframe");
  if (personaBar) {
    var test = await personaBar.$(testSelector);
    if (test) return;
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
