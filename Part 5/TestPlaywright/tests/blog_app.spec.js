const {test, expect, beforeEach, describe} = require("@playwright/test")

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http:localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name : 'Matti Luukkainen',
        username : 'mluukkai',
        password : 'salainen'
      }
    })
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

  describe('Login', () => {
    test('succeds with correct credentials', async({page}) => {

      await page.getByTestId('username').fill('mluukkai')
      await page.getByTestId('password').fill('salainen')

      await page.getByRole('button', { name: 'Login' }).click()

      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async({page}) => {
      await page.getByTestId('username').fill('mluukkai')
      await page.getByTestId('password').fill('salada')

      await page.getByRole('button', { name: 'Login' }).click()

      await expect(page.getByText('Username or Password is incorrect.')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({page}) => {
      await page.getByTestId('username').fill('mluukkai')
      await page.getByTestId('password').fill('salainen')

      await page.getByRole('button', { name: 'Login' }).click()
    })

    test('a new blog can be created', async({page}) => {
      await page.getByRole("button", {name : 'Create new Blog'}).click()
      await page.getByTestId('title').fill('hello')
      await page.getByTestId('author').fill('marco')
      await page.getByTestId('url').fill('.com')
      await page.getByRole('button', {name: "Create"}).click()
      await expect(page.getByText('hello - marco')).toBeVisible()
    })
  })
})