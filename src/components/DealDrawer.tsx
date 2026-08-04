import { ArrowUpRight, CheckCircle2, CircleAlert, X } from 'lucide-react'
import type { Opportunity } from '../domain/schema'
import type { ScoreResult } from '../domain/scoring'
import { formatDate, formatMoney } from '../domain/format'
import { EvidenceBadge } from './EvidenceBadge'

interface DealDrawerProps {
  opportunity: Opportunity
  score: ScoreResult
  defaultScore: ScoreResult
  onClose: () => void
}

const Field = ({ label, value }: { label: string; value: string }) => (
  <div className="memo-field">
    <dt>{label}</dt>
    <dd>{value}</dd>
  </div>
)

export function DealDrawer({ opportunity, score, defaultScore, onClose }: DealDrawerProps) {
  const earnings = opportunity.facts.earnings
  const scoreDelta = score.total - defaultScore.total
  return (
    <div className="drawer-backdrop" role="presentation" onMouseDown={onClose}>
      <aside
        className="deal-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="memo-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="drawer-header">
          <div>
            <span className="eyebrow">Partner deal memo • unverified lead</span>
            <h2 id="memo-title">{opportunity.title}</h2>
            <div className="muted-line">
              <span>{opportunity.location.label}</span><span>•</span><span>{opportunity.industry}</span>
            </div>
          </div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Close deal memo">
            <X size={18} aria-hidden="true" />
          </button>
        </header>

        <div className="drawer-body">
          <section className="memo-score-hero">
            <div className="score-block">
              <span className="large-score">{score.total}</span>
              <div><strong>{score.band}</strong><span>Raw {score.rawScore.toFixed(2)} / 100</span></div>
            </div>
            <div className="score-context">
              <span className={`status-pill status-${score.thesisStatus}`}>{score.thesisStatus.replaceAll('_', ' ')}</span>
              <span>{scoreDelta === 0 ? 'No numerical move vs default thesis' : `${scoreDelta > 0 ? '+' : ''}${scoreDelta} vs default thesis`}</span>
              <small>{score.screenVersion} • {score.thesisVersion}</small>
            </div>
          </section>

          <section className="memo-section">
            <div className="memo-section-heading">
              <div><span className="eyebrow">What the listing reports</span><h3>Source facts</h3></div>
              <EvidenceBadge state="sourced" />
            </div>
            <p className="evidence-explainer">Reported by the source; not yet independently verified.</p>
            <dl className="memo-field-grid">
              <Field label="Asking price" value={formatMoney(opportunity.facts.askingPrice)} />
              <Field label="Revenue" value={formatMoney(opportunity.facts.revenue)} />
              <Field label={earnings?.sourceLabel ?? 'Earnings'} value={formatMoney(earnings?.value ?? null)} />
              <Field label="Workforce" value={opportunity.facts.workforce ?? 'Unknown'} />
              <Field label="Management" value={opportunity.facts.management ?? 'Unknown'} />
              <Field label="Owner involvement" value={opportunity.facts.ownerInvolvement ?? 'Unknown'} />
              <Field label="Recurring revenue" value={opportunity.facts.recurringRevenue ?? 'Unknown'} />
              <Field label="Financing claim" value={opportunity.facts.financing ?? 'Unknown'} />
              <Field label="Transition claim" value={opportunity.facts.transition ?? 'Unknown'} />
            </dl>
            <div className="source-callout">
              <div>
                <strong>{opportunity.source.marketplace} #{opportunity.source.listingId}</strong>
                <span>Retrieved {formatDate(opportunity.source.retrievedAt)}</span>
              </div>
              <a href={opportunity.source.canonicalUrl} target="_blank" rel="noreferrer">
                Open canonical listing <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </div>
            <p className="availability-line"><CircleAlert size={14} aria-hidden="true" />Availability: {opportunity.source.availabilityClaim}</p>
          </section>

          <section className="memo-section">
            <div className="memo-section-heading">
              <div><span className="eyebrow">Fixed-weight screen</span><h3>Why it scored {score.total}</h3></div>
              <EvidenceBadge state="calculated" />
            </div>
            <div className="score-breakdown">
              {score.components.map((component) => (
                <div className="score-component" key={component.id}>
                  <div className="component-label">
                    <span>{component.label}</span>
                    <EvidenceBadge state={component.evidenceKind} compact />
                  </div>
                  <div className="component-bar" aria-hidden="true">
                    <span style={{ width: `${(component.points / component.maxPoints) * 100}%` }} />
                  </div>
                  <strong>{component.points.toFixed(2)} / {component.maxPoints}</strong>
                  <p>{component.explanation}</p>
                </div>
              ))}
            </div>

            {score.caps.length > 0 && (
              <div className="cap-list">
                <h4>Applied caps</h4>
                {score.caps.map((cap) => (
                  <div key={cap.id}>
                    <CircleAlert size={15} aria-hidden="true" />
                    <p><strong>{cap.label} — cap {cap.cap}</strong><span>{cap.explanation}</span></p>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="memo-section">
            <div className="memo-section-heading">
              <div><span className="eyebrow">Active thesis</span><h3>Eligibility gates</h3></div>
            </div>
            <div className="gate-list">
              {score.gates.map((gate) => (
                <div key={gate.id} className={`gate gate-${gate.status}`}>
                  {gate.status === 'in_thesis' ? <CheckCircle2 size={16} aria-hidden="true" /> : <CircleAlert size={16} aria-hidden="true" />}
                  <p><strong>{gate.label}</strong><span>{gate.explanation}</span></p>
                  <span>{gate.status.replaceAll('_', ' ')}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="memo-section inference-section">
            <div className="memo-section-heading">
              <div><span className="eyebrow">Interpretation, not listing fact</span><h3>Underwriting inference</h3></div>
              <EvidenceBadge state="inferred" />
            </div>
            <p className="inference-rationale">{opportunity.inference.rationale}</p>
            <ul className="flag-list">
              {opportunity.inference.flags.map((flag) => <li key={flag}>{flag}</li>)}
            </ul>
          </section>

          <section className="memo-section unknown-section">
            <div className="memo-section-heading">
              <div><span className="eyebrow">No assumption made</span><h3>Unknowns to request</h3></div>
              <EvidenceBadge state="unknown" />
            </div>
            <ol className="unknown-list">
              {opportunity.unknowns.map((unknown) => <li key={unknown}>{unknown}</li>)}
            </ol>
            <p className="next-action"><strong>Next action:</strong> {score.nextAction} Start with {opportunity.unknowns.slice(0, 3).join(', ').toLowerCase()}.</p>
          </section>
        </div>
      </aside>
    </div>
  )
}
