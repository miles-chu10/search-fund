import { z } from 'zod'

const runwaySchema = z.object({
  months: z.number().int().positive(),
  monthlyPersonalBurn: z.number().nonnegative(),
  monthlySearchOverhead: z.number().nonnegative(),
  oneTimeCosts: z.number().nonnegative(),
  diligenceReserve: z.number().nonnegative(),
  contingency: z.number().nonnegative(),
  total: z.number().nonnegative(),
})

export const prelaunchContractSchema = z.object({
  version: z.literal('prelaunch-v1.0'),
  asOf: z.iso.date(),
  mode: z.literal('credential_free_planning'),
  externalMutation: z.literal(false),
  flagship: z.object({
    name: z.string().min(1),
    surface: z.literal('responsive_web_dashboard'),
    service: z.string().min(1),
    recommendationStatus: z.literal('hypothesis'),
    why: z.array(z.string().min(1)).min(1),
  }),
  recommendedPath: z.object({
    id: z.literal('self_funded'),
    label: z.string().min(1),
    status: z.literal('recommendation_hypothesis'),
    decisionGateId: z.literal('G2-path-runway'),
    boundary: z.string().min(1),
  }),
  strategyHypothesis: z.object({
    evidenceState: z.literal('illustrative_assumption'),
    geography: z.string().min(1),
    industries: z.array(z.string().min(1)).min(1),
    earningsRange: z.object({
      basis: z.enum(['SDE', 'EBITDA']),
      minimum: z.number().nonnegative(),
      maximum: z.number().positive(),
    }),
    enterpriseValueRange: z.object({
      minimum: z.number().nonnegative(),
      maximum: z.number().positive(),
    }),
    requiredCharacteristics: z.array(z.string().min(1)).min(1),
    exclusions: z.array(z.string().min(1)).min(1),
  }),
  decisionInputs: z.array(z.object({
    id: z.string().min(1),
    label: z.string().min(1),
    category: z.enum(['commitment', 'thesis', 'capacity', 'risk', 'capital']),
    status: z.literal('unknown'),
    userOwned: z.literal(true),
    sensitive: z.boolean(),
  })).min(1),
  paths: z.array(z.object({
    id: z.enum(['traditional_search', 'self_funded', 'independent_sponsor']),
    label: z.string().min(1),
    evidenceMaturity: z.string().min(1),
    illustrativeRunway: runwaySchema,
    dependencies: z.array(z.string().min(1)).min(1),
    continueCriteria: z.string().min(1),
    stopCriteria: z.string().min(1),
  })).length(3),
  roadmap: z.array(z.object({
    week: z.number().int().min(1).max(12),
    outcome: z.string().min(1),
    acceptance: z.string().min(1),
  })).length(12),
  kpis: z.array(z.object({
    id: z.string().min(1),
    label: z.string().min(1),
    numerator: z.string().min(1),
    denominator: z.string().min(1),
    formula: z.string().min(1),
    zeroDenominator: z.literal('null'),
    boundary: z.string().min(1),
  })).min(1),
  decisionGates: z.array(z.object({
    id: z.string().min(1),
    owner: z.string().min(1),
    status: z.enum(['verified', 'open', 'blocked_by_scope']),
    requiredEvidence: z.string().min(1),
    passResult: z.string().min(1),
  })).min(1),
  risks: z.array(z.object({
    id: z.string().min(1),
    statement: z.string().min(1),
    likelihood: z.number().int().min(1).max(5),
    impact: z.number().int().min(1).max(5),
    riskScore: z.number().int().min(1).max(25),
    mitigation: z.string().min(1),
  })).min(1),
  weeklyCadence: z.array(z.object({
    when: z.string().min(1),
    minutes: z.number().int().positive(),
    activity: z.string().min(1),
    output: z.string().min(1),
  })).min(1),
  diligenceFolders: z.array(z.object({
    id: z.string().regex(/^\d{2}-[a-z0-9-]+$/),
    purpose: z.string().min(1),
  })).min(1),
  outreachTemplates: z.array(z.object({
    id: z.string().min(1),
    audience: z.string().min(1),
    draftOnly: z.literal(true),
    sentAt: z.null(),
    subject: z.string().min(1),
    body: z.string().min(1),
  })).min(1),
  sources: z.array(z.object({
    id: z.string().min(1),
    publisher: z.string().min(1),
    title: z.string().min(1),
    publishedAt: z.string().min(1),
    accessedAt: z.iso.date(),
    classification: z.string().min(1),
    url: z.string().url().refine((url) => url.startsWith('https://'), 'Source URL must use HTTPS'),
    supports: z.string().min(1),
  })).min(1),
})

export type PrelaunchContract = z.infer<typeof prelaunchContractSchema>

export const calculateRunwayTotal = (runway: z.infer<typeof runwaySchema>) =>
  runway.months * (runway.monthlyPersonalBurn + runway.monthlySearchOverhead)
  + runway.oneTimeCosts
  + runway.diligenceReserve
  + runway.contingency

