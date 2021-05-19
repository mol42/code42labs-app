describe("Signup form test", () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it("welcome screen signup button should be visible", async () => {
    await expect(element(by.id("welcome_signup_button"))).toBeVisible();
  });

  it("next screen", async () => {
    const signupButton = await element(by.id("welcome_signup_button"));
    signupButton.tap();
    await waitFor(element(by.id("signup_form_container"))).toBeVisible().withTimeout(2000);
  });
});
