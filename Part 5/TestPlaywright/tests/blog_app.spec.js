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
    await request.post('http://localhost:3003/api/users', {
      data: {
        name : 'Arto Hellas',
        username : 'hellas',
        password : 'artoHello'
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
    

    describe('When there is a blog', () => {
      beforeEach(async ({page}) => {
      await page.getByRole("button", {name : 'Create new Blog'}).click()
      await page.getByTestId('title').fill('ka')
      await page.getByTestId('author').fill('marc')
      await page.getByTestId('url').fill('.net')
      await page.getByRole('button', {name: "Create"}).click()
      await page.getByRole('button', {name: "View"}).click()
    })

    test('a blog can be liked', async({page}) => {
      await page.getByRole('button', {name: "Like"}).click()
      await expect(page.getByText('1')).toBeVisible()
    })

    test('the user who created a blog can delete it', async({ page }) => {

      page.once('dialog', async dialog => {
        expect(dialog.type()).toContain('confirm')
        expect(dialog.message()).toContain("Remove blog You're NOT gonna need it! by marc")
        await dialog.accept()
      })

      await page.getByRole('button', { name: "Remove" }).click()
      await expect(page.getByText('ka - marc')).not.toBeVisible()
    })

    test('Only the creator can see the remove button', async({page}) => {
      await expect(page.getByRole('button',{name: 'Remove'})).toBeVisible()

      await page.getByRole('button', { name: 'Logout'}).click()
      await page.getByTestId('username').fill('hellas')
      await page.getByTestId('password').fill('artoHello')
      await page.getByRole('button', {name : 'Login'}).click()

      await page.getByRole('button', {name: "View"}).click()
      await expect(page.getByRole('button', {name: 'Remove'})).not.toBeVisible()
    })
    })

    test('blogs should be sorted by likes in descending order', async({page}) => {

      await page.getByRole("button", {name : 'Create new Blog'}).click()
      await page.getByTestId('title').fill('hello')
      await page.getByTestId('author').fill('marco')
      await page.getByTestId('url').fill('.com')
      await page.getByRole('button', {name: "Create"}).click()
      await page.getByRole('button', {name: "View"}).click()
      const button = await page.getByRole('button', {name: 'like'}).last()
      await button.click()
      await button.click()

      const blogs = await page.$$eval('.blog', blogs => blogs.map(blog => blog.textContent));
      expect(blogs[0]).toContain('hello - marco');
      
    })
  })
})