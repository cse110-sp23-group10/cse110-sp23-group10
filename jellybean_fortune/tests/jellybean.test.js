describe("jellybean", () => {
  beforeAll(async () => {
    await page.goto(`file://${__dirname}/../jellybean.html`);
  });
  // get <query>.style.display
  async function getStyleDisplay(query) {
    const element = await page.$(query);
    const style = await element.getProperty("style");
    const display = await style.getProperty("display");
    return await display.jsonValue();
  }
  it("check initial state", async () => {
    // #blur-overlay should be hidden
    expect(await getStyleDisplay("#blur-overlay")).toBe("none");
  });
  it("show instructions", async () => {
    const button = await page.$('*[onclick="showInstructions()"]');
    await button.click();
    // #instructions-modal and #blur-overlay should be displayed
    expect(await getStyleDisplay("#instructions-modal")).toBe("block");
    expect(await getStyleDisplay("#blur-overlay")).toBe("block");
  });
  it("close instructions", async () => {
    const button = await page.$('*[onclick="closeInstructions()"]');
    await button.click();
    // #instructions-modal and #blur-overlay should be hidden
    expect(await getStyleDisplay("#instructions-modal")).toBe("none");
    expect(await getStyleDisplay("#blur-overlay")).toBe("none");
  });
  it("shake jar", async () => {
    const oldShakes = await page.evaluate(() => {
      return localStorage.getItem("jar_shakes");
    });
    const button = await page.$('*[onclick="shakeJar()"]');
    await button.click();
    // jar classList should contain "shake"
    const jar = await page.$("#jar");
    const classList = await jar.getProperty("classList");
    const list = await classList.jsonValue();
    let hasShake = false;
    for (const index in list) {
      if (list[index] === "shake") {
        hasShake = true;
      }
    }
    expect(hasShake).toBeTruthy();
    // number of jar shakes should increment
    const newShakes = await page.evaluate(() => {
      return localStorage.getItem("jar_shakes");
    });
    expect(newShakes).toBe(String(oldShakes + 1));
  });
});
