import manifestJson from '../data/source-manifest.json'
import { describe, expect, it } from 'vitest'
import { opportunities } from '../src/data/load'
import { sourceIdentity } from '../src/domain/dedupe'

describe('source provenance', () => {
  it('has a unique source-linked manifest record for every displayed opportunity', () => {
    const keys = new Set(manifestJson.map((record) => record.sourceKey))
    expect(keys.size).toBe(opportunities.length)

    for (const opportunity of opportunities) {
      const key = sourceIdentity({
        marketplace: opportunity.source.marketplace,
        listingId: opportunity.source.listingId,
        canonicalUrl: opportunity.source.canonicalUrl,
      })
      const source = manifestJson.find((record) => record.sourceKey === key)
      expect(source, opportunity.id).toBeDefined()
      expect(source?.canonicalUrl).toBe(opportunity.source.canonicalUrl)
      expect(source?.retrievedAt).toBe(opportunity.source.retrievedAt)
    }
  })

  it('keeps unknowns explicit', () => {
    expect(opportunities.every((opportunity) => opportunity.unknowns.length > 0)).toBe(true)
    expect(opportunities.some((opportunity) => opportunity.facts.askingPrice === null)).toBe(true)
    expect(opportunities.some((opportunity) => opportunity.facts.revenue === null)).toBe(true)
  })
})
