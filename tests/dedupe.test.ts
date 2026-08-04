import { describe, expect, it } from 'vitest'
import { canonicalizeUrl, sourceIdentity } from '../src/domain/dedupe'

describe('sourceIdentity', () => {
  it('uses marketplace and listing ID when present', () => {
    expect(
      sourceIdentity({
        marketplace: 'Example',
        listingId: '123',
        canonicalUrl: 'https://example.com/listing/123',
      }),
    ).toBe('Example:123')
  })

  it('falls back to a deterministic canonical URL hash', () => {
    const base = sourceIdentity({
      marketplace: 'Example',
      canonicalUrl: 'https://EXAMPLE.com/listing/123/?tracking=1#top',
    })
    const canonical = sourceIdentity({
      marketplace: 'Example',
      canonicalUrl: 'https://example.com/listing/123',
    })
    expect(base).toBe(canonical)
    expect(base).toMatch(/^Example:url-[a-f0-9]{8}$/)
  })

  it('removes query parameters, fragments, and trailing slashes', () => {
    expect(canonicalizeUrl('https://EXAMPLE.com/path/?utm_source=test#details')).toBe(
      'https://example.com/path',
    )
  })
})
