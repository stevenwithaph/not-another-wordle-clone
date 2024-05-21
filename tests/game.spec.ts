import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
	await page.goto('/');

	await expect(page).toHaveTitle(/Not Another Wordle Clone/);
});

test('click', async ({ page }) => {
	await page.goto('/');
	await page.locator('#key-q').click();

	const gridItem = page.locator('#grid-0 #grid-item-0');

	await expect(gridItem).toHaveText('q');
});

test('key', async ({ page }) => {
	await page.goto('/');
	await page.locator('#keyboard').press('KeyQ');

	const gridItem = page.locator('#grid-0 #grid-item-0');

	await expect(gridItem).toHaveText('q');
});

test('delete', async ({ page }) => {
	await page.goto('/');

	await page.locator('#keyboard').press('KeyQ');
	await page.locator('#keyboard').press('KeyQ');

	await page.locator('#keyboard').press('Backspace');

	const gridItem1 = page.locator('#grid-0 #grid-item-0');
	const gridItem2 = page.locator('#grid-0 #grid-item-1');

	await expect(gridItem1).toHaveText('q');
	await expect(gridItem2).toHaveText('');
});

test('valid-guess', async ({ page }) => {
	await page.goto('/');
	await page.locator('#keyboard').press('KeyH');
	await page.locator('#keyboard').press('KeyE');
	await page.locator('#keyboard').press('KeyL');
	await page.locator('#keyboard').press('KeyL');
	await page.locator('#keyboard').press('KeyO');

	await page.locator('#keyboard').press('Enter');

	await page.locator('#keyboard').press('KeyQ');

	const gridItem = page.locator('#grid-1 #grid-item-0');

	await expect(gridItem).toHaveText('q');
});

test('invalid-guess', async ({ page }) => {
	await page.goto('/');
	await page.locator('#keyboard').press('KeyQ');
	await page.locator('#keyboard').press('KeyW');
	await page.locator('#keyboard').press('KeyE');
	await page.locator('#keyboard').press('KeyR');
	await page.locator('#keyboard').press('KeyT');

	await page.locator('#keyboard').press('Enter');

	await page.locator('#keyboard').press('KeyY');

	const gridItem = page.locator('#grid-1 #grid-item-0');

	await expect(gridItem).toHaveText('');
});
