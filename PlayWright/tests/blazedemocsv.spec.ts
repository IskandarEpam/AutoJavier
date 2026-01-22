import { test, expect } from '@playwright/test';
import fs from 'fs';
import csv from 'csv-parser';
import path from 'path';


test('fill form with CSV data', async ({ page }) => {
  // Read CSV file
  const csvPath = path.join(__dirname, '../Data/Pasajero.csv'); // Adjust path to your CSV folder
  const data: Record<string, string>[] = [];
  
  await new Promise((resolve, reject) => {
    fs.createReadStream(csvPath)
      .pipe(csv())
      .on('data', (row) => data.push(row))
      .on('end', resolve)
      .on('error', reject);
  });

  await page.goto('https://blazedemo.com/');
  await expect(page).toHaveTitle(/BlazeDemo/);
  
  for (const formData of data) {
    await selectRandomOption(page, 'select[name="fromPort"]');
    await selectRandomOption(page, 'select[name="toPort"]');
    await page.getByRole('button', { name: 'Find Flights' }).click();
    await page.getByRole('row', { name: 'Choose This Flight 12 Virgin' }).getByRole('button').click();
    
    // Fill form with current CSV row
    for (const [key, value] of Object.entries(formData)) {
      const trimmedKey = key.trim();
      const trimmedValue = value.trim();
      
      const selector = `select[name="${trimmedKey}"], input[name="${trimmedKey}"]`;
      const element = await page.$(selector);
      
      if (element) {
        const tagName = await element.evaluate(el => el.tagName.toLowerCase());
        if (tagName === 'select') {
          await page.selectOption(`select[name="${trimmedKey}"]`, trimmedValue);
        } else {
          await page.fill(selector, trimmedValue);
        }
      }
    }
    
    await page.click('input.btn.btn-primary[type="submit"]');
    // Optional: add navigation back to start for next iteration if needed
    await page.goto('https://blazedemo.com/');
  }
});

import { Page } from '@playwright/test';

async function selectRandomOption(page: Page, selector: string) {
  const options = await page.locator(`${selector} option`).allTextContents();
  const filteredOptions = options.filter((opt: string) => opt !== '--- Please select ---');
  const randomOption = filteredOptions[Math.floor(Math.random() * filteredOptions.length)];
  await page.locator(selector).selectOption(randomOption);
}