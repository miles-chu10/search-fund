export interface RefreshIdentityInput {
  marketplace: string
  listingId?: string | null
  canonicalUrl: string
}

export const canonicalizeUrl = (value: string) => {
  const url = new URL(value)
  url.hash = ''
  url.search = ''
  url.hostname = url.hostname.toLowerCase()
  url.pathname = url.pathname.replace(/\/+$/, '') || '/'
  return url.toString()
}

export const stableUrlHash = (value: string) => {
  let hash = 2166136261
  for (const character of canonicalizeUrl(value)) {
    hash ^= character.charCodeAt(0)
    hash = Math.imul(hash, 16777619)
  }
  return (hash >>> 0).toString(16).padStart(8, '0')
}

export const sourceIdentity = ({ marketplace, listingId, canonicalUrl }: RefreshIdentityInput) =>
  listingId?.trim()
    ? `${marketplace.trim()}:${listingId.trim()}`
    : `${marketplace.trim()}:url-${stableUrlHash(canonicalUrl)}`
