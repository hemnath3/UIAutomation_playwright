animaldata = require("../testData/animalInfo.json");
const { addAttach } = require("jest-html-reporters/helper");

class AnimalPage {
  constructor(page) {
    this.page = page;
  }

  async addAnimals() {
    //Adding products to the cart and purchasing

    await page.click('#SidebarContent >> //a[contains(@href,"FISH")]');
    await page.click('"FI-SW-01"', { delay: 1000 });
    const fishPrice = await page.$eval(
      '(//td[contains(text(),"Large")]/./following::td)[1]',
      (el) => el.innerText
    );
    expect(fishPrice).toBe(animaldata.fishPrice);
    await page.click('"EST-1"');
    await page.click('"Add to Cart"');

    await page.click('//a[contains(@href,"DOGS")]');
    await page.click('"K9-BD-01"');
    const dogPrice = await page.$eval(
      '//td[contains(text(),"Male")]/./following::td',
      (el) => el.innerText
    );
    expect(dogPrice).toBe(animaldata.dogPrice);
    await page.click('"EST-7"');
    await page.click('"Add to Cart"');

    await page.click('//a[contains(@href,"CATS")]');
    await page.click('"FL-DSH-01"');
    const catPrice = await page.$eval(
      '//td[contains(text(),"Tailless")]/./following::td',
      (el) => el.innerText
    );
    expect(catPrice).toBe(animaldata.catPrice);
    await page.click('"EST-14"');
    await page.click('"Add to Cart"');
    await page.waitForTimeout(1000);

    const itemsIncartBeforeRemoval = await page.$$("//tr/td[6]");
    expect(itemsIncartBeforeRemoval.length).toBe(3);
  }

  async removeAnimals() {
    const noOfItemsInCart = await page.$$('"Remove"');

    for (let i = 0; i < noOfItemsInCart.length - 1; i++) {
      await page.click('(//a[text()="Remove"])');
    }

    const itemsIncartAfterRemoval = await page.$$("//tr/td[6]");
    expect(itemsIncartAfterRemoval.length).toBe(1);
  }

  async checkoutAndPurchase() {
    await page.click('"Proceed to Checkout"');
    await page.click('//input[@name="newOrder"]');
    await page.click('"Confirm"');
    await page.waitForSelector('"Thank you, your order has been submitted."');
  }

  async searchAnimal(animal) {
    await page.fill('//form >> //input[@name="keyword"]', animal);
    await page.click('//form >> //input[@name="searchProducts"]', {
      delay: 1000,
    });
    const animalname = await page.$eval(
      "//td[2]/./following::td",
      (el) => el.innerText
    );
    expect(animalname).toBe(animaldata.animalName);
  }
}
module.exports = { AnimalPage };
