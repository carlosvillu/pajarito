import { test, expect } from '@playwright/test'
import { faker } from '@faker-js/faker'

test.describe('Trinos', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login')

    // Register a new user
    await page.click('a:has-text("Register")')
    await expect(page).toHaveURL(/.*register/)

    const username = faker.internet.username()
    await page.fill('input[name="username"]', username)
    await page.fill('input[name="password"]', 'testpassword123')
    await page.click('button:has-text("Create User")')

    // Should be redirected to login
    await expect(page).toHaveURL(/.*login/)
  })

  test('should create a trino with text only', async ({ page }) => {
    await page.fill('input[name="username"]', 'testuser')
    await page.fill('input[name="password"]', 'testpassword123')
    await page.click('button:has-text("Login")')

    // Should be on trinos page
    await expect(page).toHaveURL(/\//)
    await expect(page.getByRole('heading', { name: 'Trinos' })).toBeVisible()

    // Fill and submit trino form
    const trinoText = faker.lorem.sentence()
    await page.fill('textarea[name="body"]', trinoText)
    await page.click('button:has-text("Send")')

    // Should see the trino in the list
    await expect(page.getByText(trinoText)).toBeVisible()
  })

  test('should create a trino with one image', async ({ page }) => {
    await page.fill('input[name="username"]', 'testuser')
    await page.fill('input[name="password"]', 'testpassword123')
    await page.click('button:has-text("Login")')

    await expect(page).toHaveURL(/\//)

    // Click camera button
    await page.click('button:has-text("PhotoCamera")')

    // Upload an image
    const fileInput = page.locator('input[type="file"]')
    await fileInput.setInputFiles({
      name: 'test-image.jpg',
      mimeType: 'image/jpeg',
      buffer: Buffer.from('/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAB//2Q=='),
    })

    // Verify image preview appears
    await expect(page.locator('img[alt*="Trino image"]').first()).toBeVisible()

    // Submit the trino
    const trinoText = faker.lorem.sentence()
    await page.fill('textarea[name="body"]', trinoText)
    await page.click('button:has-text("Send")')

    // Verify trino appears with image
    await expect(page.getByText(trinoText)).toBeVisible()
    await expect(page.locator('img[alt*="Trino image"]').first()).toBeVisible()
  })

  test('should create a trino with multiple images', async ({ page }) => {
    await page.fill('input[name="username"]', 'testuser')
    await page.fill('input[name="password"]', 'testpassword123')
    await page.click('button:has-text("Login")')

    await expect(page).toHaveURL(/\//)

    // Click camera button
    await page.click('button:has-text("PhotoCamera")')

    // Upload multiple images
    const fileInput = page.locator('input[type="file"]')
    await fileInput.setInputFiles([
      { name: 'image1.jpg', mimeType: 'image/jpeg', buffer: Buffer.from('/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAB//2Q==') },
      { name: 'image2.jpg', mimeType: 'image/jpeg', buffer: Buffer.from('/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAB//2Q==') },
    ])

    // Verify image previews appear
    await expect(page.locator('img[alt*="Trino image"]').first()).toBeVisible()
    await expect(page.locator('img[alt*="Trino image"]').nth(1)).toBeVisible()

    // Submit the trino
    const trinoText = faker.lorem.sentence()
    await page.fill('textarea[name="body"]', trinoText)
    await page.click('button:has-text("Send")')

    // Verify trino appears with both images
    await expect(page.getByText(trinoText)).toBeVisible()
  })

  test('should remove an image from preview', async ({ page }) => {
    await page.fill('input[name="username"]', 'testuser')
    await page.fill('input[name="password"]', 'testpassword123')
    await page.click('button:has-text("Login")')

    await expect(page).toHaveURL(/\//)

    // Click camera button
    await page.click('button:has-text("PhotoCamera")')

    // Upload an image
    const fileInput = page.locator('input[type="file"]')
    await fileInput.setInputFiles({
      name: 'test-image.jpg',
      mimeType: 'image/jpeg',
      buffer: Buffer.from('/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAB//2Q=='),
    })

    // Verify image preview appears
    await expect(page.locator('img[alt*="Trino image"]').first()).toBeVisible()

    // Click close button to remove image
    await page.click('button:has-text("Close")')

    // Image should be removed
    await expect(page.locator('img[alt*="Trino image"]').first()).not.toBeVisible()
  })

  test('should display images in grid layout', async ({ page }) => {
    await page.fill('input[name="username"]', 'testuser')
    await page.fill('input[name="password"]', 'testpassword123')
    await page.click('button:has-text("Login")')

    await expect(page).toHaveURL(/\//)

    // Upload 4 images
    await page.click('button:has-text("PhotoCamera")')
    const fileInput = page.locator('input[type="file"]')
    await fileInput.setInputFiles([
      { name: '1.jpg', mimeType: 'image/jpeg', buffer: Buffer.from('/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAB//2Q==') },
      { name: '2.jpg', mimeType: 'image/jpeg', buffer: Buffer.from('/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAB//2Q==') },
      { name: '3.jpg', mimeType: 'image/jpeg', buffer: Buffer.from('/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAB//2Q==') },
      { name: '4.jpg', mimeType: 'image/jpeg', buffer: Buffer.from('/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAB//2Q==') },
    ])

    // Submit the trino
    await page.fill('textarea[name="body"]', 'Trino with 4 images')
    await page.click('button:has-text("Send")')

    // Verify all 4 images are displayed
    await expect(page.locator('img[alt*="Trino image"]')).toHaveCount(4)
  })
})
