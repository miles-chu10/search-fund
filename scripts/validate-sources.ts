import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { z } from 'zod'
import { sourceIdentity } from '../src/domain/dedupe'
import { opportunityListSchema } from '../src/domain/schema'

const manifestSchema = z.array(
  z.object({
    sourceKey: z.string().min(1),
    marketplace: z.string().min(1),
    listingId: z.string().min(1),
    canonicalUrl: z.string().url(),
    retrievedAt: z.iso.date(),
  }),
)

const root = resolve(import.meta.dirname, '..')
const opportunities = opportunityListSchema.parse(
  JSON.parse(await readFile(resolve(root, 'data/opportunities.json'), 'utf8')),
)
const manifest = manifestSchema.parse(
  JSON.parse(await readFile(resolve(root, 'data/source-manifest.json'), 'utf8')),
)

if (opportunities.length !== manifest.length) {
  throw new Error(`Opportunity/manifest count mismatch: ${opportunities.length} vs ${manifest.length}`)
}

const manifestByKey = new Map(manifest.map((source) => [source.sourceKey, source]))
if (manifestByKey.size !== manifest.length) throw new Error('Source manifest contains duplicate source keys')

for (const opportunity of opportunities) {
  const expectedKey = sourceIdentity({
    marketplace: opportunity.source.marketplace,
    listingId: opportunity.source.listingId,
    canonicalUrl: opportunity.source.canonicalUrl,
  })
  const source = manifestByKey.get(expectedKey)
  if (!source) throw new Error(`Missing manifest record for ${opportunity.id} (${expectedKey})`)
  if (source.canonicalUrl !== opportunity.source.canonicalUrl) {
    throw new Error(`Canonical URL mismatch for ${opportunity.id}`)
  }
  if (source.retrievedAt !== opportunity.source.retrievedAt) {
    throw new Error(`Retrieval-date mismatch for ${opportunity.id}`)
  }
  if (!source.canonicalUrl.startsWith('https://')) {
    throw new Error(`Non-HTTPS source URL for ${opportunity.id}`)
  }
}

console.log(`Validated ${opportunities.length} opportunities: canonical URL, source identity, and retrieval date present.`)
