import { z } from 'zod'

export const sourceSchema = z.object({
  marketplace: z.string().min(1),
  listingId: z.string().min(1),
  canonicalUrl: z.string().url().refine((url) => url.startsWith('https://'), 'Source URL must use HTTPS'),
  retrievedAt: z.iso.date(),
  publishedAt: z.iso.date().nullable(),
  updatedAt: z.iso.date().nullable(),
  availabilityClaim: z.string().min(1),
})

export const financialFactSchema = z.object({
  value: z.number().nonnegative(),
  sourceLabel: z.enum(['SDE', 'EBITDA', 'Cash flow', 'Income', 'Discretionary earnings']),
})

export const opportunitySchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  tier: z.enum(['A', 'B']),
  industry: z.string().min(1),
  location: z.object({
    label: z.string().min(1),
    region: z.enum(['Northeast', 'Southeast', 'Southwest', 'Remote / nationwide']),
  }),
  source: sourceSchema,
  facts: z.object({
    askingPrice: z.number().positive().nullable(),
    revenue: z.number().nonnegative().nullable(),
    earnings: financialFactSchema.nullable(),
    largestCustomerShare: z.number().min(0).max(1).nullable().default(null),
    recurringRevenue: z.string().nullable(),
    workforce: z.string().nullable(),
    management: z.string().nullable(),
    ownerInvolvement: z.string().nullable(),
    financing: z.string().nullable(),
    transition: z.string().nullable(),
    summary: z.string().min(1),
  }),
  inference: z.object({
    managerReadiness: z.number().int().min(0).max(4).nullable(),
    durableDemand: z.number().int().min(0).max(4).nullable(),
    recurringQuality: z.number().int().min(0).max(4).nullable(),
    operationalSimplicity: z.number().int().min(0).max(4).nullable(),
    concentrationQuality: z.number().int().min(0).max(4).nullable(),
    transitionFeasibility: z.number().int().min(0).max(4).nullable(),
    rationale: z.string().min(1),
    flags: z.array(z.string()),
  }),
  unknowns: z.array(z.string()).min(1),
})

export const opportunityListSchema = z.array(opportunitySchema).min(1)

export type Opportunity = z.infer<typeof opportunitySchema>
export type SourceRecord = z.infer<typeof sourceSchema>

export interface AcquisitionCriteria {
  targetGeographies: string[]
  includedIndustries: string[]
  excludedIndustries: string[]
  minimumEarnings: {
    basis: 'SDE' | 'EBITDA'
    amount: number
  }
  maximumEquityCheck: number
}
