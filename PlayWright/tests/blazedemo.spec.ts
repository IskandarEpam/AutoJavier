import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://blazedemo.com/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/BlazeDemo/);
await page.locator('select[name="fromPort"]').selectOption('Philadelphia');
await page.getByRole('button', { name: 'Find Flights' }).click();
await page.getByRole('row', { name: 'Choose This Flight 12 Virgin' }).getByRole('button').click();
await page.getByRole('textbox', { name: 'Name', exact: true }).click();
await page.getByRole('textbox', { name: 'Name', exact: true }).fill('jaime');
await page.getByRole('textbox', { name: 'Address' }).click();
await page.getByRole('textbox', { name: 'Address' }).fill('dos campos');
await page.getByRole('button', { name: 'Purchase Flight' }).click();
await page.getByRole('heading', { name: 'Thank you for your purchase' }).click();

});