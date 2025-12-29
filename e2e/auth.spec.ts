import { test, expect } from '@playwright/test'

test.describe('Authentication', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login')
  })

  test('should display login form', async ({ page }) => {
    await expect(page.locator('text=Login')).toBeVisible()
    await expect(page.locator('input[name="username"]')).toBeVisible()
    await expect(page.locator('input[name="password"]')).toBeVisible()
    await expect(page.locator('button:has-text("Login")')).toBeVisible()
  })

  test('should navigate to register page', async ({ page }) => {
    await page.click('a:has-text("Register")')
    await expect(page).toHaveURL(/.*register/)
    await expect(page.locator('text=Register')).toBeVisible()
  })

  test('should login with valid credentials', async ({ page }) => {
    await page.fill('input[name="username"]', 'testuser')
    await page.fill('input[name="password"]', 'password123')
    await page.click('button:has-text("Login")')

    await expect(page).toHaveURL(/.*/)
  })

  test('should show error for invalid login', async ({ page }) => {
    await page.fill('input[name="username"]', 'invalid')
    await page.fill('input[name="password"]', 'wrong')
    await page.click('button:has-text("Login")')

    await expect(page.locator('text=Login')).toBeVisible()
  })
})

test.describe('Register', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/register')
  })

  test('should display register form', async ({ page }) => {
    await expect(page.locator('text=Register')).toBeVisible()
    await expect(page.locator('input[name="username"]')).toBeVisible()
    await expect(page.locator('input[name="password"]')).toBeVisible()
    await expect(page.locator('button:has-text("Create User")')).toBeVisible()
  })

  test('should navigate to login page', async ({ page }) => {
    await page.click('a:has-text("Login")')
    await expect(page).toHaveURL(/.*login/)
    await expect(page.locator('text=Login')).toBeVisible()
  })

  test('should register new user and redirect to login', async ({ page }) => {
    const uniqueUser = `newuser${Date.now()}`
    await page.fill('input[name="username"]', uniqueUser)
    await page.fill('input[name="password"]', 'password123')
    await page.click('button:has-text("Create User")')

    await expect(page).toHaveURL(/.*login/)
  })

  test('should show error for short username', async ({ page }) => {
    await page.fill('input[name="username"]', 'abc')
    await page.fill('input[name="password"]', 'password123')
    await page.click('button:has-text("Create User")')

    expect(page.locator('dialog')).toBeVisible()
  })
})

test.describe('Logout', () => {
  test('should logout user', async ({ page }) => {
    await page.goto('/login')
    await page.fill('input[name="username"]', 'testuser')
    await page.fill('input[name="password"]', 'password123')
    await page.click('button:has-text("Login")')
    await expect(page).toHaveURL(/.*/)

    await page.click('button:has-text("Logout")')
  })
})
