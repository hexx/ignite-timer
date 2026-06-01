import { test, expect } from '@playwright/test'

test.describe('Ignite Timer - モード切り替え', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('ページが正しく表示される', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Ignite Timer')
    await expect(page.getByTestId('mode-nav')).toBeVisible()
  })

  test('デフォルトで5秒ルールモードが表示される', async ({ page }) => {
    await expect(page.getByTestId('five-second-timer')).toBeVisible()
  })

  test('2分間ルールモードに切り替えられる', async ({ page }) => {
    await page.getByTestId('mode-btn-two-minute').click()
    await expect(page.getByTestId('two-minute-timer')).toBeVisible()
    await expect(page.getByTestId('five-second-timer')).not.toBeVisible()
  })

  test('10分間ルールモードに切り替えられる', async ({ page }) => {
    await page.getByTestId('mode-btn-ten-minute').click()
    await expect(page.getByTestId('ten-minute-timer')).toBeVisible()
  })

  test('5秒ルールに戻れる', async ({ page }) => {
    await page.getByTestId('mode-btn-two-minute').click()
    await page.getByTestId('mode-btn-five-second').click()
    await expect(page.getByTestId('five-second-timer')).toBeVisible()
  })
})

test.describe('5秒ルールモード', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await expect(page.getByTestId('five-second-timer')).toBeVisible()
  })

  test('初期状態でスタートボタンが表示される', async ({ page }) => {
    await expect(page.getByTestId('start-btn')).toBeVisible()
    await expect(page.getByTestId('countdown-number')).toContainText('5')
  })

  test('スタートボタンを押すとカウントダウンが始まる', async ({ page }) => {
    await page.getByTestId('start-btn').click()
    await expect(page.getByTestId('start-btn')).not.toBeVisible()
  })

  test('カウントダウン完了後に GO! が表示される', async ({ page }) => {
    await page.getByTestId('start-btn').click()
    await expect(page.getByTestId('go-message')).toBeVisible({ timeout: 8000 })
    await expect(page.getByTestId('reset-btn')).toBeVisible()
  })

  test('もう一度ボタンでリセットされる', async ({ page }) => {
    await page.getByTestId('start-btn').click()
    await expect(page.getByTestId('go-message')).toBeVisible({ timeout: 8000 })
    await page.getByTestId('reset-btn').click()
    await expect(page.getByTestId('start-btn')).toBeVisible()
    await expect(page.getByTestId('countdown-number')).toContainText('5')
  })
})

test.describe('2分間ルールモード', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.getByTestId('mode-btn-two-minute').click()
    await expect(page.getByTestId('two-minute-timer')).toBeVisible()
  })

  test('初期状態で2:00が表示される', async ({ page }) => {
    await expect(page.getByTestId('time-display')).toContainText('2:00')
    await expect(page.getByTestId('start-btn')).toBeVisible()
  })

  test('プログレスバーが表示される', async ({ page }) => {
    await expect(page.getByTestId('progress-container')).toBeVisible()
    await expect(page.getByTestId('progress-bar')).toBeVisible()
  })

  test('スタート後に一時停止できる', async ({ page }) => {
    await page.getByTestId('start-btn').click()
    await expect(page.getByTestId('pause-btn')).toBeVisible({ timeout: 3000 })
    await page.getByTestId('pause-btn').click()
    await expect(page.getByTestId('resume-btn')).toBeVisible()
    await expect(page.getByTestId('reset-btn')).toBeVisible()
  })

  test('一時停止後に再開できる', async ({ page }) => {
    await page.getByTestId('start-btn').click()
    await page.getByTestId('pause-btn').click({ timeout: 3000 })
    await page.getByTestId('resume-btn').click()
    await expect(page.getByTestId('pause-btn')).toBeVisible()
  })
})

test.describe('10分間ルールモード', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.getByTestId('mode-btn-ten-minute').click()
    await expect(page.getByTestId('ten-minute-timer')).toBeVisible()
  })

  test('初期状態で10:00が表示される', async ({ page }) => {
    await expect(page.getByTestId('time-display')).toContainText('10:00')
    await expect(page.getByTestId('start-btn')).toBeVisible()
  })

  test('スタート後に一時停止できる', async ({ page }) => {
    await page.getByTestId('start-btn').click()
    await expect(page.getByTestId('pause-btn')).toBeVisible({ timeout: 3000 })
    await page.getByTestId('pause-btn').click()
    await expect(page.getByTestId('resume-btn')).toBeVisible()
  })
})
