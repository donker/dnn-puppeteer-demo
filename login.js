const elements = {
  userButton: "#dnn_dnnUser_enhancedRegisterLink",
  loginLogoffButton: "#dnn_dnnLogin_enhancedLoginLink",
  usernameBox: "#dnn_ctr_Login_Login_DNN_txtUsername",
  passwordBox: "#dnn_ctr_Login_Login_DNN_txtPassword",
  loginButton: "#dnn_ctr_Login_Login_DNN_cmdLogin"
};

exports.login = async function (page, username, password) {
  await page.click(elements.loginLogoffButton);
  const frames = await page.frames();
  const popup = frames.find(f => f.name() === "iPopUp");
  if (popup) {
    const un = await popup.waitForSelector(elements.usernameBox);
    await un.click(elements.usernameBox);
    await page.keyboard.type(username);
    await popup.click(elements.passwordBox);
    await page.keyboard.type(password);
    await popup.click(elements.loginButton);
    await page.waitForNavigation();
  }
};

exports.logout = async function (page) {
  await page.waitForSelector(elements.loginLogoffButton);
  await page.click(elements.loginLogoffButton);
}

exports.currentUserDisplayname = async function (page) {
  await page.waitForSelector(elements.userButton);
  const displayName = await page.$eval(elements.userButton, el => el.textContent);
  return displayName;
}
