import { Locator, Page } from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly input_username: Locator;
    readonly input_password: Locator;
    readonly btn_login: Locator;
    readonly msg_error: Locator;

    constructor(page: Page) {
        this.page = page;
        this.input_username = page.locator('#user-name');
        this.input_password = page.locator('#password');
        this.btn_login = page.locator('#login-button');
        this.msg_error = page.locator("h3[data-test='error']");
    }

    async goto() {
        await this.page.goto("/");
    }

    async inputUsername(username: string) {
        await this.input_username.fill(username);
    }

    async inputPassword(password: string) {
        await this.input_password.fill(password);
    }

    async clickLoginButton() {
        await this.btn_login.click();
    }

    async getErrorMessage() {
        return await this.msg_error.textContent() ?? "";
    }

    async login() {
        await this.goto();
        await this.inputUsername("standard_user");
        await this.inputPassword("secret_sauce");
        await this.clickLoginButton();
    }
}
