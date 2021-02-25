data = require("../testData/loginData.json");

class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async navigate(url) {
    await page.goto(url);
    const enterSTore = await page.$('"Enter the Store"');
    await enterSTore.click({ delay: 1000 });
  }

  async registerNewAccount() {
    await page.waitForSelector('"Sign In"');
    await page.click('"Sign In"', { delay: 1000 });

    const registerNow = await page.$('"Register Now!"');

    await registerNow.click({ delay: 1000 });
  }

  async enterUserDetails() {
    const id = Math.floor(Math.random() * 123456).toString();

    await page.fill('input[name="username"]', id);

    await page.type('input[name="password"]', data.password);

    await page.type('input[name="repeatedPassword"]', data.password);

    await page.fill('input[name="account.firstName"]', data.firstname);

    await page.fill('input[name="account.lastName"]', data.lastname);

    await page.fill('input[name="account.email"]', data.email);

    await page.fill('input[name="account.phone"]', data.phoneNo);

    await page.fill('input[name="account.address1"]', data.address);

    await page.fill('input[name="account.city"]', data.city);

    await page.fill('input[name="account.state"]', data.state);

    await page.fill('input[name="account.zip"]', data.zipcode);

    await page.fill('input[name="account.country"]', data.country);

    await page.click('input[name="newAccount"]');

    return id;
  }

  async signIn(id, password) {
    await page.click('"Sign In"', { delay: 1000 });
    await page.fill('input[name="username"]', id);
    await page.fill('input[name="password"]', "");
    await page.type('input[name="password"]', "Test@789#");
    await page.click('input[name="signon"]');
  }

  async imagesCheck() {
    const images = await page.$$('//img[contains(@src,"gif")]');

    for (let i = 1; i < images.length; i++) {
      const visible = page.isVisible(
        '(//img[contains(@src,"gif")])[' + i + "]"
      );
      expect(visible).toBeTruthy();
    }
  }

  async signOut() {
    await page.click('"Sign Out"');
  }
}

module.exports = { LoginPage };
