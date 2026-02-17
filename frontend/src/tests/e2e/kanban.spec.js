import { test, expect } from '@playwright/test'

test.describe('kanban board', () => {
  test('should load kanban board', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('h1')).toContainText('Kanban Board')
    await expect(page.getByText('To Do')).toBeVisible()
    await expect(page.getByText('In Progress')).toBeVisible()
    await expect(page.getByText('Done')).toBeVisible()
  })

  test('should create a task', async ({ page }) => {
    await page.goto('/')
    await page.click('text=Add Task')
    await page.fill('input[placeholder="Enter task title"]', 'test task')
    await page.fill('textarea[placeholder="Enter task description"]', 'test description')
    await page.click('button:has-text("Create Task")')
    await expect(page.getByText('test task')).toBeVisible()
  })

  test('should delete a task', async ({ page }) => {
    await page.goto('/')
    await page.click('text=Add Task')
    await page.fill('input[placeholder="Enter task title"]', 'delete me')
    await page.fill('textarea[placeholder="Enter task description"]', 'will be deleted')
    await page.click('button:has-text("Create Task")')
    
    await page.waitForTimeout(500)
    
    const deleteBtn = page.locator('text=delete me').locator('..').locator('button').first()
    await deleteBtn.click()
    
    await expect(page.getByText('delete me')).not.toBeVisible()
  })
})
