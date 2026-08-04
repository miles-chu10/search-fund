import { describe, expect, it } from 'vitest'
import { opportunities } from '../src/data/load'
import {
  capitalScenarioChecks,
  CATEGORY_WEIGHTS,
  DEFAULT_CRITERIA,
  scoreOpportunity,
} from '../src/domain/scoring'

describe('scoreOpportunity', () => {
  it('is deterministic for the same opportunity and criteria', () => {
    const opportunity = opportunities[0]
    expect(scoreOpportunity(opportunity, DEFAULT_CRITERIA)).toEqual(
      scoreOpportunity(opportunity, DEFAULT_CRITERIA),
    )
  })

  it('keeps the transparent category weights fixed at 100', () => {
    expect(Object.values(CATEGORY_WEIGHTS).reduce((sum, weight) => sum + weight, 0)).toBe(100)
    const result = scoreOpportunity(opportunities[0], DEFAULT_CRITERIA)
    expect(result.components.reduce((sum, component) => sum + component.maxPoints, 0)).toBe(100)
  })

  it('marks an explicit industry exclusion out of thesis without deleting the lead', () => {
    const opportunity = opportunities.find((item) => item.industry === 'Marketing services')!
    const included = scoreOpportunity(opportunity, {
      ...DEFAULT_CRITERIA,
      includedIndustries: ['Marketing services'],
      excludedIndustries: [],
    })
    const excluded = scoreOpportunity(opportunity, {
      ...DEFAULT_CRITERIA,
      includedIndustries: ['Marketing services'],
      excludedIndustries: ['Marketing services'],
    })
    expect(included.thesisStatus).not.toBe('out_of_thesis')
    expect(excluded.thesisStatus).toBe('out_of_thesis')
    expect(excluded.total).toBe(included.total)
  })

  it('applies explicit missing behavior and the critical-data cap', () => {
    const opportunity = opportunities.find(
      (item) => item.inference.concentrationQuality === null,
    )!
    const result = scoreOpportunity(opportunity)
    const component = result.components.find((item) => item.id === 'customerConcentration')
    expect(component).toMatchObject({ evidenceKind: 'unknown' })
    expect(component?.points).toBe(1)
    expect(result.caps).toEqual(
      expect.arrayContaining([expect.objectContaining({ id: 'critical-operating-data', cap: 69 })]),
    )
  })

  it('does not apply the SDE/EBITDA threshold to another source label', () => {
    const opportunity = opportunities.find(
      (item) => item.facts.earnings?.sourceLabel === 'Income',
    )!
    const result = scoreOpportunity(opportunity, DEFAULT_CRITERIA)
    expect(result.gates.find((item) => item.id === 'minimum-earnings')).toMatchObject({
      status: 'needs_data',
      evidenceKind: 'unknown',
    })
    expect(result.caps).toEqual(
      expect.arrayContaining([expect.objectContaining({ id: 'critical-price-earnings', cap: 49 })]),
    )
  })

  it('keeps an unknown price unavailable and calculates cash checks from total uses', () => {
    const unknownPrice = opportunities.find((item) => item.facts.askingPrice === null)!
    expect(capitalScenarioChecks(unknownPrice)).toEqual({
      selfFunded: null,
      traditionalSearch: null,
      independentSponsor: null,
    })

    const knownPrice = opportunities.find((item) => item.facts.askingPrice === 750000)!
    expect(capitalScenarioChecks(knownPrice)).toEqual({
      selfFunded: 210000,
      traditionalSearch: 84000,
      independentSponsor: 42000,
    })
  })
})
