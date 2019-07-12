const common = require("./common");
var faker = require('faker');

const addNewRoleBtn =
  "#roles-container > div > div > div > div.dnn-persona-bar-page-header > div > button";

const newRolePanel = {
  path: "div.role-details-editor",
  mainDiv: {
    path: " > div.dnn-grid-system",
    leftColumn: {
      path: " > div:nth-child(1) > div.editor-container",
      roleName: " > div:nth-child(1) input[type='text']",
      description: " > div:nth-child(2) textarea",
      status: " > div:nth-child(3) div.dnn-dropdown",
      public: " > div:nth-child(4) span.dnn-switch"
    },
    rightColumn: {
      path: " > div:nth-child(2) > div.editor-container",
      roleGroup: " > div:nth-child(1) div.dnn-dropdown",
      securityMode: " > div:nth-child(2) div.dnn-dropdown",
      rsvpCode: " > div:nth-child(3) input[type='text']",
      autoAssign: " > div:nth-child(5) span.dnn-switch"
    }
  },
  buttons: {
    path: " div.buttons-box",
    cancel: " button[role='secondary']",
    save: " button[role='primary']"
  }
};

exports.addRole = async function(
  page,
  roleName,
  description,
  status,
  public,
  roleGroup,
  securityMode,
  rsvpCode,
  autoAssign
) {
  const frames = await page.frames();
  const personaBar = frames.find(f => f.name() === "personaBar-iframe");
  if (personaBar) {
    await personaBar.click(addNewRoleBtn);
    await personaBar.waitForSelector(newRolePanel.path);
    await personaBar.click(newRolePanel.getPath("roleName"));
    await page.keyboard.type(roleName);
    if (description) {
      await personaBar.click(newRolePanel.getPath("description"));
      await page.keyboard.type(description);
    }
    if (status) {
      await common.dropdownSelect(
        personaBar,
        newRolePanel.getPath("status"),
        status
      );
    }
    if (public) {
      await personaBar.click(newRolePanel.getPath("public"));
    }
    if (roleGroup) {
      await common.dropdownSelect(
        personaBar,
        newRolePanel.getPath("roleGroup"),
        roleGroup
      );
    }
    if (securityMode) {
      await common.dropdownSelect(
        personaBar,
        newRolePanel.getPath("securityMode"),
        securityMode
      );
    }
    if (rsvpCode) {
      await personaBar.click(newRolePanel.getPath("rsvpCode"));
      await page.keyboard.type(rsvpCode);
    }
    if (autoAssign) {
      await personaBar.click(newRolePanel.getPath("autoAssign"));
    }
    await personaBar.click(newRolePanel.getPath("save"));
    await page.waitFor(5000);
  }
};

exports.addRandomRole = async function(page) {
  var roleName = faker.company.bs;
  await this.addRole(page, roleName, "Random role");
  return roleName;
};
