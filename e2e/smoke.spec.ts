import { expect, test } from '@playwright/test'

const firstOpportunityTitle = 'Absentee-run Commercial Cleaning Company — SBA Pre-Approved'

test('pipeline supports criteria, memo, comparison, refresh, and capital paths', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Acquisition pipeline' })).toBeVisible()
  await expect(page.getByTestId('opportunity-row')).toHaveCount(10)
  await expect(page.getByText('Seven fixed categories total 100 points')).toBeVisible()

  await page.getByRole('button', { name: firstOpportunityTitle, exact: true }).click()
  const memo = page.getByRole('dialog', { name: /Absentee-run Commercial Cleaning/ })
  await expect(memo.getByText('Source facts')).toBeVisible()
  await expect(memo.getByText('Underwriting inference')).toBeVisible()
  await expect(memo.getByText('Unknowns to request')).toBeVisible()
  await expect(memo.getByRole('link', { name: 'Open canonical listing' })).toHaveAttribute('href', /^https:\/\//)
  await memo.getByRole('button', { name: 'Close deal memo' }).click()

  const compareChecks = page.getByRole('checkbox', { name: /^Compare / })
  await compareChecks.nth(0).check()
  await compareChecks.nth(1).check()
  await page.getByRole('button', { name: /Compare 2/ }).click()
  await expect(page.getByRole('dialog', { name: 'Compare opportunities' })).toBeVisible()
  await page.getByRole('button', { name: 'Close comparison' }).click()

  if ((page.viewportSize()?.width ?? 1000) < 900) {
    await page.getByRole('button', { name: 'Open navigation' }).click()
  }
  await page.getByRole('button', { name: /Refresh/ }).click()
  await expect(page.getByRole('heading', { name: 'Daily sourcing & briefing' })).toBeVisible()
  await expect(page.getByText('Weekdays • 7:30 AM')).toBeVisible()
  await expect(page.getByText('No connector or schedule is active in this demo.')).toBeVisible()

  if ((page.viewportSize()?.width ?? 1000) < 900) {
    await page.getByRole('button', { name: 'Open navigation' }).click()
  }
  await page.getByRole('button', { name: /Capital/ }).click()
  await expect(page.getByRole('heading', { name: 'Capital planning preview' })).toBeVisible()
  await expect(page.getByText('Scenario—not advice')).toBeVisible()
  await page.getByLabel('Opportunity').selectOption('dealstream-pu5w7x')
  await expect(page.getByText('Asking price is unknown.')).toBeVisible()
  await expect(page.getByText('Needs price')).toBeVisible()
  await expect(page.getByText('Within active screen')).toHaveCount(0)
})

test('responsive layout has no page overflow and mobile controls stay usable', async ({ page }) => {
  await page.goto('/')
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
  expect(overflow).toBeLessThanOrEqual(1)

  if ((page.viewportSize()?.width ?? 1000) < 700) {
    await page.getByRole('button', { name: /Acquisition criteria/ }).click()
    await expect(page.getByText('Live thesis')).toBeVisible()
    await expect(page.getByLabel('Maximum equity check')).toBeVisible()
    await page.getByRole('button', { name: /Acquisition criteria/ }).click()
  }

  await expect(page.getByRole('button', { name: firstOpportunityTitle, exact: true })).toBeVisible()
})
