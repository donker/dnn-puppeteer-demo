exports.isVisible = async function(page, selector) {
  await page.$eval(selector, elem => {
    return (
      window.getComputedStyle(elem).getPropertyValue("display") !== "none" &&
      elem.offsetHeight
    );
  });
  return false;
};

exports.dropdownSelect = async function(page, selector, value) {
  await page.click(selector);
  await page.waitForSelector(selector + " ul.dnn-dropdown-options");
  switch (typeof value) {
    case "string":
      const options = await page.$$(selector + " li.dnn-dropdown-option");
      for (var i = 0; i < options.length; i++) {
        let option = options[i];
        let text = await page.evaluate(option => option.textContent, option);
        if (text == value) {
          await option.click();
          await page.waitFor(500);
        }
      }
      break;
    case "number":
      await page.click(
        selector + " li.dnn-dropdown-option:nth-child(" + value.toString() + ")"
      );
      break;
  }
};
