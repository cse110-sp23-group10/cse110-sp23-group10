describe("audio", () => {
  beforeAll(async () => {
    await page.goto(`file://${__dirname}/../jellybean.html`);
  });
  it("check sound icon initial state", async () => {
    const sound = await page.$("#sound-icon");
    const src = await page.evaluate((sound) => {
      return sound.src;
    }, sound);
    // icon should be unmuted
    expect(src).toContain("/assets/sound-white.svg");
  });
  it("check clicking on sound icon", async () => {
    const sound = await page.$("#sound-icon");
    await sound.click();
    const src = await page.evaluate((sound) => {
      return sound.src;
    }, sound);
    // icon should be muted
    expect(src).toContain("/assets/mute-white.svg");
  });
});
