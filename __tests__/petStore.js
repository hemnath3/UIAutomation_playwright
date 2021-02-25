const { addAttach } = require("jest-html-reporters/helper");
const { LoginPage } = require("../pageObjects/login");
const { AnimalPage } = require("../pageObjects/animal");
const data = require("../testData/loginData.json");
const animaldata = require("../testData/animalInfo.json");
const assert = require("assert");
global.UserId = null;

describe("PetStore", () => {
  const loginPage = new LoginPage(page);
  const animalPage = new AnimalPage(page);

  beforeAll(async () => {
    await loginPage.navigate(data.url);
  });

  test("Sign Up to the store", async () => {
    await loginPage.registerNewAccount();
    global.UserId = await loginPage.enterUserDetails();
    await loginPage.signIn(global.UserId, data.password);
    const screengrab = await page.screenshot({ fullPage: true });
    await addAttach(screengrab);
  });

  test("Check if all images are visible", async () => {
    await loginPage.signIn(global.UserId, data.password);
    await loginPage.imagesCheck();
    const screengrab = await page.screenshot({ fullPage: true });
    await addAttach(screengrab);
  });

  test("Search for an Animal", async () => {
    await loginPage.signIn(global.UserId, data.password);
    await animalPage.searchAnimal(animaldata.animal);
    const screengrab = await page.screenshot({ fullPage: true });
    await addAttach(screengrab);
  });

  test("Purchase three animals_E2E", async () => {
    await loginPage.signIn(global.UserId, data.password);
    await animalPage.addAnimals();
    await animalPage.checkoutAndPurchase();
    const screengrab = await page.screenshot({ fullPage: true });
    await addAttach(screengrab);
  });

  test("Update cart by removing two animals", async () => {
    await loginPage.signIn(global.UserId, data.password);
    await animalPage.addAnimals();
    await animalPage.removeAnimals();
    const screengrab = await page.screenshot({ fullPage: true });
    await addAttach(screengrab);
  });

  afterEach(async () => {
    await loginPage.signOut();
  });

  afterAll(async () => {
    await browser.close();
  });
});
