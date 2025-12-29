import { test, expect } from '@playwright/test'

test.describe('Trinos', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login')
    await page.fill('input[name="username"]', 'testuser')
    await page.fill('input[name="password"]', 'password123')
    await page.click('button:has-text("Login")')
    await expect(page).toHaveURL(/.*/)
  })

  test('should display trinos page', async ({ page }) => {
    await expect(page.locator('text=Trinos')).toBeVisible()
  })

  test('should create a new trino', async ({ page }) => {
    await page.click('button:has-text("Add")')
    await expect(page.locator('text=Trino text')).toBeVisible()

    await page.fill('textarea[name="body"]', 'Hello from Playwright test!')
    await page.click('button:has-text("Send")')

    await expect(page.locator('text=Hello from Playwright test!')).toBeVisible()
  })

  test('should show trinos list', async ({ page }) => {
    await expect(page.locator('[class*="trino"]')).toBeVisible()
  })

  test('should not create empty trino', async ({ page }) => {
    await page.click('button:has-text("Add")')
    await page.fill('textarea[name="body"]', '')
    await page.click('button:has-text("Send")')

    expect(page.locator('dialog')).toBeVisible()
  })
})
