import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test('should redirect to login when accessing protected route without auth', async ({
    page,
  }) => {
    await page.goto('/')
    await expect(page).toHaveURL(/.*login/)
  })

  test('should stay on login when already authenticated', async ({ page }) => {
    await page.goto('/login')
    await page.fill('input[name="username"]', 'testuser')
    await page.fill('input[name="password"]', 'password123')
    await page.click('button:has-text("Login")')

    await expect(page).toHaveURL(/.*/)
    await expect(page).not.toHaveURL(/.*login/)
  })

  test('should allow access to login page', async ({ page }) => {
    await page.goto('/login')
    await expect(page).toHaveURL(/.*login/)
    await expect(page.locator('text=Login')).toBeVisible()
  })

  test('should allow access to register page', async ({ page }) => {
    await page.goto('/register')
    await expect(page).toHaveURL(/.*register/)
    await expect(page.locator('text=Register')).toBeVisible()
  })

  test('should show 404 for unknown route', async ({ page }) => {
    await page.goto('/unknown-route')
    expect(page.locator('text=404')).toBeVisible()
  })
})

test.describe('Layout', () => {
  test('should display layout when authenticated', async ({ page }) => {
    await page.goto('/login')
    await page.fill('input[name="username"]', 'testuser')
    await page.fill('input[name="password"]', 'password123')
    await page.click('button:has-text("Login")')

    await expect(page.locator('header')).toBeVisible()
    await expect(page.locator('text=Trinos')).toBeVisible()
  })

  test('should not display layout on login page', async ({ page }) => {
    await page.goto('/login')
    await expect(page.locator('header')).not.toBeVisible()
  })

  test('should not display layout on register page', async ({ page }) => {
    await page.goto('/register')
    await expect(page.locator('header')).not.toBeVisible()
  })
})
