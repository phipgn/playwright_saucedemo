import test from '../baseTest';

test.beforeEach("abc", async ({ loginPage }) => {
    await loginPage.login();
});

test("test", async ({ inventoryPage }) => {
    const productItems = await inventoryPage.getProductItems();
    for (const productItem of productItems) {
        console.log(await productItem.getTitle());
        console.log(await productItem.getPrice());
    }
});