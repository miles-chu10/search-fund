import { describe, expect, it } from 'vitest'
import { prelaunch } from '../src/data/prelaunch'
import { calculateRunwayTotal } from '../src/domain/prelaunch'

describe('pre-launch operating contract', () => {
  it('keeps every personal input unknown and user-owned', () => {
    expect(prelaunch.decisionInputs).toHaveLength(10)
    expect(prelaunch.decisionInputs.every((input) => input.status === 'unknown' && input.userOwned)).toBe(true)
  })

  it('reconciles the three illustrative runway formulas', () => {
    expect(prelaunch.paths.map((path) => path.id)).toEqual([
      'traditional_search',
      'self_funded',
      'independent_sponsor',
    ])
    for (const path of prelaunch.paths) {
      expect(calculateRunwayTotal(path.illustrativeRunway), path.id).toBe(path.illustrativeRunway.total)
    }
  })

  it('has a complete twelve-week roadmap and null-safe KPI definitions', () => {
    expect(prelaunch.roadmap.map((item) => item.week)).toEqual(Array.from({ length: 12 }, (_, index) => index + 1))
    expect(prelaunch.kpis.every((kpi) => kpi.zeroDenominator === 'null')).toBe(true)
  })

  it('keeps outreach draft-only with no external mutation', () => {
    expect(prelaunch.externalMutation).toBe(false)
    expect(prelaunch.outreachTemplates.every((template) => template.draftOnly && template.sentAt === null)).toBe(true)
  })

  it('calculates every risk score and uses current HTTPS sources', () => {
    for (const risk of prelaunch.risks) {
      expect(risk.riskScore, risk.id).toBe(risk.likelihood * risk.impact)
    }
    expect(prelaunch.sources.every((source) => source.url.startsWith('https://'))).toBe(true)
    expect(prelaunch.sources.every((source) => source.accessedAt === prelaunch.asOf)).toBe(true)
  })
})
