import { Calculator, CircleHelp, Database, Sparkles } from 'lucide-react'

export type EvidenceState = 'sourced' | 'calculated' | 'inferred' | 'unknown'

const evidenceCopy: Record<EvidenceState, { label: string; detail: string }> = {
  sourced: {
    label: 'Sourced fact',
    detail: 'Reported by the source; not yet independently verified.',
  },
  calculated: {
    label: 'Calculated',
    detail: 'Calculated from reported inputs.',
  },
  inferred: {
    label: 'Inference',
    detail: 'Model inference — validate in diligence.',
  },
  unknown: {
    label: 'Unknown',
    detail: 'Not provided or conflicting; no assumption made.',
  },
}

const icons = {
  sourced: Database,
  calculated: Calculator,
  inferred: Sparkles,
  unknown: CircleHelp,
}

export function EvidenceBadge({ state, compact = false }: { state: EvidenceState; compact?: boolean }) {
  const Icon = icons[state]
  const copy = evidenceCopy[state]
  return (
    <span className={`evidence-badge evidence-${state}`} title={copy.detail}>
      <Icon size={12} aria-hidden="true" />
      {compact ? copy.label.split(' ')[0] : copy.label}
    </span>
  )
}

export function EvidenceLegend() {
  return (
    <div className="evidence-legend" aria-label="Evidence labels">
      {(Object.keys(evidenceCopy) as EvidenceState[]).map((state) => (
        <EvidenceBadge key={state} state={state} />
      ))}
    </div>
  )
}
