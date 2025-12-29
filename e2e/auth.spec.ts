import { test, expect } from '@playwright/test'

test.describe('Authentication', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login')
  })

  test('should display login form', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible()
    await expect(page.locator('input[name="username"]')).toBeVisible()
    await expect(page.locator('input[name="password"]')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible()
  })

  test('should navigate to register page', async ({ page }) => {
    await page.click('a:has-text("Register")')
    await expect(page).toHaveURL(/.*register/)
    await expect(page.getByRole('heading', { name: 'Register' })).toBeVisible()
  })

  test('should show error for invalid login', async ({ page }) => {
    await page.fill('input[name="username"]', 'invalid')
    await page.fill('input[name="password"]', 'wrong')
    await page.click('button[type="submit"]:has-text("Login")')
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible()
  })
})

test.describe('Register', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/register')
  })

  test('should display register form', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Register' })).toBeVisible()
    await expect(page.locator('input[name="username"]')).toBeVisible()
    await expect(page.locator('input[name="password"]')).toBeVisible()
    await expect(
      page.getByRole('button', { name: 'Create User' })
    ).toBeVisible()
  })

  test('should navigate to login page', async ({ page }) => {
    await page.click('a:has-text("Login")')
    await expect(page).toHaveURL(/.*login/)
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible()
  })
})

test.describe('Navigation', () => {
  test('should redirect to login when accessing protected route without auth', async ({
    page,
  }) => {
    await page.goto('/')
    await expect(page).toHaveURL(/.*login/)
  })

  test('should allow access to login page', async ({ page }) => {
    await page.goto('/login')
    await expect(page).toHaveURL(/.*login/)
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible()
  })

  test('should allow access to register page', async ({ page }) => {
    await page.goto('/register')
    await expect(page).toHaveURL(/.*register/)
    await expect(page.getByRole('heading', { name: 'Register' })).toBeVisible()
  })
})

test.describe('Layout', () => {
  test('should not display layout on login page', async ({ page }) => {
    await page.goto('/login')
    await expect(page.locator('header')).not.toBeVisible()
  })

  test('should not display layout on register page', async ({ page }) => {
    await page.goto('/register')
    await expect(page.locator('header')).not.toBeVisible()
  })
})
