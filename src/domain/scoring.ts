import type { AcquisitionCriteria, Opportunity } from './schema'

export const SCREEN_VERSION = 'screen-v1.0'

export const DEFAULT_CRITERIA: AcquisitionCriteria = {
  targetGeographies: ['Northeast', 'Southeast', 'Remote / nationwide'],
  includedIndustries: ['B2B software & services', 'Commercial services', 'Property management'],
  excludedIndustries: ['Multi-site consumer'],
  minimumEarnings: { basis: 'SDE', amount: 250000 },
  maximumEquityCheck: 1000000,
}

export const CATEGORY_WEIGHTS = {
  earningsQuality: 20,
  durableDemand: 15,
  customerConcentration: 10,
  operationalComplexity: 10,
  managerReadiness: 15,
  priceFinancingFit: 20,
  dataConfidence: 10,
} as const

type EvidenceKind = 'sourced' | 'calculated' | 'inferred' | 'unknown'
type ThesisStatus = 'in_thesis' | 'out_of_thesis' | 'needs_data'

export interface ScoreComponent {
  id: keyof typeof CATEGORY_WEIGHTS
  label: string
  points: number
  maxPoints: number
  evidenceKind: EvidenceKind
  explanation: string
}

export interface ThesisGate {
  id: string
  label: string
  status: ThesisStatus
  evidenceKind: EvidenceKind
  explanation: string
}

export interface ScoreCap {
  id: string
  label: string
  cap: number
  evidenceKind: EvidenceKind
  explanation: string
}

export interface ScoreResult {
  total: number
  rawScore: number
  confidencePoints: number
  components: ScoreComponent[]
  gates: ThesisGate[]
  caps: ScoreCap[]
  thesisStatus: ThesisStatus
  thesisVersion: string
  screenVersion: string
  band: string
  nextAction: string
}

const factorFromFour = (value: number | null, missing = 0.25) => {
  if (value === null) return missing
  return [0, 0.4, 0.75, 1, 1][value]
}

const largestCustomerFactor = (share: number | null) => {
  if (share === null) return 0
  if (share <= 0.1) return 1
  if (share <= 0.2) return 0.75
  if (share <= 0.35) return 0.4
  return 0
}

const ownerDependenceFactor = (opportunity: Opportunity) => {
  const owner = opportunity.facts.ownerInvolvement?.toLowerCase()
  if (!owner) return 0.25
  if (owner.includes('10 hours per month') || owner.includes('30-minute meeting')) return 1
  if (owner.includes('10–20 hours')) return 0.75
  if (owner.includes('full-time')) return 0
  return 0.25
}

const managerFactor = (opportunity: Opportunity) => {
  const value = opportunity.inference.managerReadiness
  if (value === null) return 0.25
  if (value >= 4) return opportunity.facts.ownerInvolvement ? 0.75 : 0.4
  if (value >= 2) return 0.4
  return 0
}

const processFactor = (opportunity: Opportunity) => {
  const evidence = `${opportunity.facts.management ?? ''} ${opportunity.facts.transition ?? ''}`.toLowerCase()
  if (evidence.includes('written sop') || evidence.includes('documented systems')) return 0.4
  if (evidence.includes('sops') || evidence.includes('cloud crm')) return 0.4
  return 0.25
}

const transitionFactor = (opportunity: Opportunity) => {
  const transition = opportunity.facts.transition?.toLowerCase()
  if (!transition) return 0.25
  if (transition.includes('30 days')) return 0.4
  if (transition.includes('two-week')) return 0
  return 0.25
}

const knownRequiredFieldCount = (opportunity: Opportunity) =>
  [
    false,
    opportunity.facts.askingPrice !== null,
    opportunity.facts.revenue !== null,
    opportunity.facts.earnings !== null,
    false,
    opportunity.facts.recurringRevenue !== null,
    opportunity.facts.largestCustomerShare !== null,
    false,
    opportunity.facts.ownerInvolvement !== null,
    opportunity.facts.management !== null,
    opportunity.facts.transition !== null,
    false,
  ].filter(Boolean).length

const buildComponents = (opportunity: Opportunity): ScoreComponent[] => {
  const hasPositiveEarnings = (opportunity.facts.earnings?.value ?? 0) > 0
  const earningsPoints = 8 * (hasPositiveEarnings ? 0.15 : 0) + 6 * 0.25 + 6 * 0.25

  const recurringClaimFactor = opportunity.facts.recurringRevenue ? 0.15 : 0.15
  const durablePoints =
    7 * recurringClaimFactor +
    5 * 0.25 +
    3 * factorFromFour(opportunity.inference.durableDemand)

  const concentrationPoints =
    6 * largestCustomerFactor(opportunity.facts.largestCustomerShare) + 4 * 0.25

  const operationalPoints =
    5 * ownerDependenceFactor(opportunity) +
    3 * factorFromFour(opportunity.inference.operationalSimplicity) +
    2 * 0.25

  const managerPoints =
    7 * managerFactor(opportunity) +
    4 * processFactor(opportunity) +
    4 * transitionFactor(opportunity)

  const financingEvidenceFactor = opportunity.facts.financing ? 0.15 : 0
  const pricePoints = 6 * 0 + 8 * 0 + 3 * 0 + 3 * financingEvidenceFactor

  const completenessFactor = knownRequiredFieldCount(opportunity) / 12
  const confidencePoints = 4 * 0.15 + 2 * 1 + 2 * 0.25 + 2 * completenessFactor

  return [
    {
      id: 'earningsQuality',
      label: 'Earnings quality',
      points: earningsPoints,
      maxPoints: 20,
      evidenceKind: hasPositiveEarnings ? 'sourced' : 'unknown',
      explanation: 'Listing-level earnings receive only the rubric’s 0.15 support factor; cash conversion and downside history remain missing at 0.25 each.',
    },
    {
      id: 'durableDemand',
      label: 'Durable demand',
      points: durablePoints,
      maxPoints: 15,
      evidenceKind: 'inferred',
      explanation: 'Source-stated recurring/repeat claims are kept conservative; retention is unknown and durability is a visible model inference.',
    },
    {
      id: 'customerConcentration',
      label: 'Customer concentration',
      points: concentrationPoints,
      maxPoints: 10,
      evidenceKind: opportunity.facts.largestCustomerShare === null ? 'unknown' : 'sourced',
      explanation: opportunity.facts.largestCustomerShare === null
        ? 'Largest-customer share is unknown (0 factor); top-five concentration uses the fixed 0.25 missing factor.'
        : 'Largest-customer share uses the stated listing figure; top-five concentration remains unknown.',
    },
    {
      id: 'operationalComplexity',
      label: 'Operational complexity',
      points: operationalPoints,
      maxPoints: 10,
      evidenceKind: 'inferred',
      explanation: 'Owner-dependence evidence and operating-complexity flags drive this screen; reinvestment burden remains unknown.',
    },
    {
      id: 'managerReadiness',
      label: 'Manager readiness',
      points: managerPoints,
      maxPoints: 15,
      evidenceKind: 'inferred',
      explanation: 'A conservative rubric interprets management, SOP, and transition claims; no listing is treated as a proven owner-absence test.',
    },
    {
      id: 'priceFinancingFit',
      label: 'Price & financing fit',
      points: pricePoints,
      maxPoints: 20,
      evidenceKind: 'unknown',
      explanation: 'Manager-adjusted cash flow, debt service, balanced sources/uses, and written financing evidence are not available in public listings.',
    },
    {
      id: 'dataConfidence',
      label: 'Data confidence',
      points: confidencePoints,
      maxPoints: 10,
      evidenceKind: 'calculated',
      explanation: `Aggregator authority, fresh retrieval, no independent reconciliation, and ${knownRequiredFieldCount(opportunity)}/12 required fields known.`,
    },
  ]
}

const buildGates = (opportunity: Opportunity, criteria: AcquisitionCriteria): ThesisGate[] => {
  const geographyMatch = criteria.targetGeographies.includes(opportunity.location.region)
  const excluded = criteria.excludedIndustries.includes(opportunity.industry)
  const included = criteria.includedIndustries.includes(opportunity.industry)
  const earnings = opportunity.facts.earnings
  const earningsComparable = earnings?.sourceLabel === criteria.minimumEarnings.basis

  return [
    {
      id: 'geography',
      label: 'Target geography',
      status: geographyMatch ? 'in_thesis' : 'out_of_thesis',
      evidenceKind: 'sourced',
      explanation: geographyMatch
        ? `${opportunity.location.region} is in the active target set.`
        : `${opportunity.location.region} is outside the active target set.`,
    },
    {
      id: 'industry',
      label: 'Industry inclusion / exclusion',
      status: excluded || !included ? 'out_of_thesis' : 'in_thesis',
      evidenceKind: 'sourced',
      explanation: excluded
        ? `${opportunity.industry} is explicitly excluded.`
        : included
          ? `${opportunity.industry} is explicitly included.`
          : `${opportunity.industry} is not in the nonempty inclusion list.`,
    },
    {
      id: 'minimum-earnings',
      label: `Minimum ${criteria.minimumEarnings.basis}`,
      status: !earningsComparable
        ? 'needs_data'
        : earnings.value >= criteria.minimumEarnings.amount
          ? 'in_thesis'
          : 'out_of_thesis',
      evidenceKind: earningsComparable ? 'sourced' : 'unknown',
      explanation: !earningsComparable
        ? `No comparable ${criteria.minimumEarnings.basis} value was reported; no label conversion was assumed.`
        : `${earnings.sourceLabel} is ${earnings.value >= criteria.minimumEarnings.amount ? 'at or above' : 'below'} the active threshold.`,
    },
  ]
}

export const capitalScenarioChecks = (opportunity: Opportunity) => {
  const price = opportunity.facts.askingPrice
  const totalUses = price === null ? null : price * 1.12
  const cashShare = (share: number) => (totalUses === null ? null : Math.round(totalUses * share))
  return {
    selfFunded: cashShare(0.25),
    traditionalSearch: cashShare(0.1),
    independentSponsor: cashShare(0.05),
  }
}

const buildCaps = (opportunity: Opportunity, criteria: AcquisitionCriteria): ScoreCap[] => {
  const caps: ScoreCap[] = []
  const earnings = opportunity.facts.earnings
  const usableEarningsBasis = earnings && ['SDE', 'EBITDA'].includes(earnings.sourceLabel)
  if (opportunity.facts.askingPrice === null || !usableEarningsBasis) {
    caps.push({
      id: 'critical-price-earnings',
      label: 'Critical price / earnings data',
      cap: 49,
      evidenceKind: 'unknown',
      explanation: 'Price or a positive SDE/EBITDA basis is missing; the lead remains eligible for enrichment.',
    })
  }

  if (
    opportunity.facts.largestCustomerShare === null ||
    opportunity.facts.ownerInvolvement === null ||
    opportunity.facts.management === null
  ) {
    caps.push({
      id: 'critical-operating-data',
      label: 'Critical operating data',
      cap: 69,
      evidenceKind: 'unknown',
      explanation: 'Largest customer, owner role/hours, or management-layer status is unknown.',
    })
  }

  const checks = capitalScenarioChecks(opportunity)
  const knownChecks = Object.values(checks).filter((value): value is number => value !== null)
  if (knownChecks.length > 0 && knownChecks.every((value) => value > criteria.maximumEquityCheck)) {
    caps.push({
      id: 'capital-gap',
      label: 'Illustrative capital gap',
      cap: 59,
      evidenceKind: 'calculated',
      explanation: 'All three internal scenario cash shares exceed the active equity-check cap; no financing availability is implied.',
    })
  }
  return caps
}

const thesisVersion = (criteria: AcquisitionCriteria) => {
  const input = JSON.stringify({
    ...criteria,
    targetGeographies: [...criteria.targetGeographies].sort(),
    includedIndustries: [...criteria.includedIndustries].sort(),
    excludedIndustries: [...criteria.excludedIndustries].sort(),
  })
  let hash = 2166136261
  for (const character of input) {
    hash ^= character.charCodeAt(0)
    hash = Math.imul(hash, 16777619)
  }
  return `thesis-${(hash >>> 0).toString(16).padStart(8, '0')}`
}

const bandFor = (score: number) => {
  if (score >= 80) return ['Priority diligence', 'Request evidence and investigate sooner.']
  if (score >= 65) return ['Advance to screening', 'Resolve the three most score-sensitive unknowns.']
  if (score >= 50) return ['Watchlist / enrich', 'Keep out of the priority brief until evidence changes.']
  return ['Deprioritize / hold', 'Cure the named cap or thesis mismatch before advancing.']
}

export const scoreOpportunity = (
  opportunity: Opportunity,
  criteria: AcquisitionCriteria = DEFAULT_CRITERIA,
): ScoreResult => {
  const components = buildComponents(opportunity)
  const rawScore = Number(components.reduce((sum, component) => sum + component.points, 0).toFixed(2))
  const gates = buildGates(opportunity, criteria)
  const caps = buildCaps(opportunity, criteria)
  const cappedScore = caps.reduce((score, cap) => Math.min(score, cap.cap), rawScore)
  const total = Math.floor(cappedScore + 0.5)
  const thesisStatus: ThesisStatus = gates.some((gate) => gate.status === 'out_of_thesis')
    ? 'out_of_thesis'
    : gates.some((gate) => gate.status === 'needs_data')
      ? 'needs_data'
      : 'in_thesis'
  const [band, nextAction] = bandFor(total)

  return {
    total,
    rawScore,
    confidencePoints: components.find((component) => component.id === 'dataConfidence')?.points ?? 0,
    components,
    gates,
    caps,
    thesisStatus,
    thesisVersion: thesisVersion(criteria),
    screenVersion: SCREEN_VERSION,
    band,
    nextAction,
  }
}

export const scoreChangeFromDefaults = (opportunity: Opportunity, criteria: AcquisitionCriteria) =>
  scoreOpportunity(opportunity, criteria).total - scoreOpportunity(opportunity, DEFAULT_CRITERIA).total
