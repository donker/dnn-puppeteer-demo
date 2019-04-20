var randomWords = require('random-words');
const common = require("./common");

const elements = {
  editorPanel: "div.role-details-editor",
  addNewRoleBtn:
    "#roles-container > div > div > div > div.dnn-persona-bar-page-header > div > button",
  groupsDropDown: ".groups-filter > div.dnn-dropdown",
  searchField: "#roles-list-container input[type='search']",
  roleNameTextBox:
    "div.role-details-editor > div.dnn-grid-system > div:nth-child(1) > div.editor-container > div:nth-child(1) input[type='text']",
  descriptionBox:
    "div.role-details-editor > div.dnn-grid-system > div:nth-child(1) > div.editor-container > div:nth-child(2) textarea",
  statusDropdown:
    "div.role-details-editor > div.dnn-grid-system > div:nth-child(1) > div.editor-container > div:nth-child(3) div.dnn-dropdown",
  publicSwitch:
    "div.role-details-editor > div.dnn-grid-system > div:nth-child(1) > div.editor-container > div:nth-child(4) span.dnn-switch",
  roleGroupDropdown:
    "div.role-details-editor > div.dnn-grid-system > div:nth-child(2) > div.editor-container > div:nth-child(1) div.dnn-dropdown",
  securityModeDropdown:
    "div.role-details-editor > div.dnn-grid-system > div:nth-child(2) > div.editor-container > div:nth-child(2) div.dnn-dropdown",
  rsvpCodeTextBox:
    "div.role-details-editor > div.dnn-grid-system > div:nth-child(2) > div.editor-container > div:nth-child(3) input[type='text']",
  autoAssignSwitch:
    "div.role-details-editor > div.dnn-grid-system > div:nth-child(2) > div.editor-container > div:nth-child(5) span.dnn-switch",
  cancelBtn: "div.role-details-editor div.buttons-box button[role='secondary']",
  saveBtn: "div.role-details-editor div.buttons-box button[role='primary']"
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
    await personaBar.click(elements.addNewRoleBtn);
    await personaBar.waitForSelector(elements.editorPanel);
    await personaBar.click(elements.roleNameTextBox);
    await page.keyboard.type(roleName);
    if (description) {
      await personaBar.click(elements.descriptionBox);
      await page.keyboard.type(description);
    }
    if (status) {
      await common.dropdownSelect(personaBar, elements.statusDropdown, status);
    }
    if (public) {
      await personaBar.click(elements.publicSwitch);
    }
    if (roleGroup) {
      await common.dropdownSelect(personaBar, elements.roleGroupDropdown, roleGroup);
    }
    if (securityMode) {
      await common.dropdownSelect(personaBar, elements.securityModeDropdown, securityMode);
    }
    if (rsvpCode) {
      await personaBar.click(elements.rsvpCodeTextBox);
      await page.keyboard.type(rsvpCode);
    }
    if (autoAssign) {
      await personaBar.click(elements.autoAssignSwitch);
    }
    await personaBar.click(elements.saveBtn);
    await page.waitFor(5000);
  }
};

exports.addRandomRole = async function(page) {
  var roleName = randomWords({ min: 1, max: 4, join: ' ' });
  roleName = roleName.slice(0,1).toUpperCase().concat(roleName.slice(1));
  await this.addRole(page, roleName, "Random role");
  return roleName;
}