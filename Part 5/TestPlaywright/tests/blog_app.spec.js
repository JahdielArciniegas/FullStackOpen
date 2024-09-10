const {test, expect, beforeEach, describe} = require("@playwright/test")

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async({page}) => {
    const form = await page.getByText('Log in to application')
    const input_name = await page.getByLabel('username')
    const input_password = await page.getByLabel('password')
    await expect(form).toBeVisible()
    await expect(input_name).toBeVisible()
    await expect(input_password).toBeVisible()
  })
})