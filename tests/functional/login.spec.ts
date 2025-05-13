import { expect, test as base } from '@playwright/test';
import test from '../baseTest';

test.describe('Login tests', () => {
  test('Correct username, correct password', async ({ loginPage, inventoryPage }) => {
    await loginPage.goto();
    await loginPage.inputUsername("standard_user");
    await loginPage.inputPassword("secret_sauce");
    await loginPage.clickLoginButton();
    expect(await inventoryPage.isHeaderVisible()).toBeTruthy();
  });

  test('Correct username, incorrect password', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.inputUsername("standard_user");
    await loginPage.inputPassword("secret_sauce2");
    await loginPage.clickLoginButton();

    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBe("Epic sadface: Username and password do not match any user in this service");
  });

  test('Incorrect username, correct password', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.inputUsername("standard_user2");
    await loginPage.inputPassword("secret_sauce");
    await loginPage.clickLoginButton();

    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBe("Epic sadface: Username and password do not match any user in this service");
  });

  test('Incorrect username, incorrect password', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.inputUsername("standard_user2");
    await loginPage.inputPassword("secret_sauce2");
    await loginPage.clickLoginButton();

    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBe("Epic sadface: Username and password do not match any user in this service");
  });
});
