import contract from '../contracts/refresh-contract.json'
import { describe, expect, it } from 'vitest'

describe('refresh contract', () => {
  it('is an inactive architecture preview with the required weekday flow', () => {
    expect(contract.schedule).toMatchObject({
      cadence: 'weekdays',
      localTime: '07:30',
      timeZone: 'America/Los_Angeles',
      active: false,
    })
    expect(contract.steps).toEqual([
      'search',
      'fetch_validate',
      'normalize',
      'dedupe',
      'detect_changes',
      'score',
      'brief',
      'human_review',
    ])
    expect(contract.externalMutation).toBe(false)
  })

  it('keeps the verified stack and source identity contract explicit', () => {
    expect(contract.systems).toEqual({
      primaryDiscovery: 'Exa',
      secondaryValidation: 'Parallel Search',
      proposedSourceOfTruth: 'Airtable',
      futureProprietaryPipeline: 'Clay',
    })
    expect(contract.identity).toEqual({
      primary: 'source:listingId',
      fallback: 'sha256(canonicalUrl)',
    })
    expect(contract.fieldStates).toEqual(['sourced', 'calculated', 'inferred', 'unknown'])
  })
})
