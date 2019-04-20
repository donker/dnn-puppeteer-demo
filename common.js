exports.isVisible = async function(page, selector) {
  await page.$eval(selector, elem => {
    return (
      window.getComputedStyle(elem).getPropertyValue("display") !== "none" &&
      elem.offsetHeight
    );
  });
  return false;
};
