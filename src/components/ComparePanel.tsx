import { X } from 'lucide-react'
import type { Opportunity } from '../domain/schema'
import type { AcquisitionCriteria } from '../domain/schema'
import { scoreOpportunity } from '../domain/scoring'
import { formatMoney } from '../domain/format'
import { EvidenceBadge } from './EvidenceBadge'

interface ComparePanelProps {
  opportunities: Opportunity[]
  criteria: AcquisitionCriteria
  onRemove: (id: string) => void
  onClose: () => void
}

export function ComparePanel({ opportunities, criteria, onRemove, onClose }: ComparePanelProps) {
  return (
    <div className="drawer-backdrop compare-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="compare-panel" role="dialog" aria-modal="true" aria-labelledby="compare-title" onMouseDown={(event) => event.stopPropagation()}>
        <header className="drawer-header">
          <div><span className="eyebrow">Side-by-side screen</span><h2 id="compare-title">Compare opportunities</h2></div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Close comparison"><X size={18} /></button>
        </header>
        <div className={`compare-grid compare-count-${opportunities.length}`}>
          {opportunities.map((opportunity) => {
            const score = scoreOpportunity(opportunity, criteria)
            return (
              <article className="compare-column-card" key={opportunity.id}>
                <button className="compare-remove" type="button" onClick={() => onRemove(opportunity.id)} aria-label={`Remove ${opportunity.title} from comparison`}><X size={14} /></button>
                <span className={`status-pill status-${score.thesisStatus}`}>{score.thesisStatus.replaceAll('_', ' ')}</span>
                <h3>{opportunity.title}</h3>
                <p>{opportunity.location.label}</p>
                <div className="compare-score"><strong>{score.total}</strong><span>{score.band}<small>Raw {score.rawScore.toFixed(2)}</small></span></div>
                <dl className="compare-facts">
                  <div><dt>Ask</dt><dd>{formatMoney(opportunity.facts.askingPrice)}</dd></div>
                  <div><dt>Revenue</dt><dd>{formatMoney(opportunity.facts.revenue)}</dd></div>
                  <div><dt>{opportunity.facts.earnings?.sourceLabel ?? 'Earnings'}</dt><dd>{formatMoney(opportunity.facts.earnings?.value ?? null)}</dd></div>
                </dl>
                <EvidenceBadge state="sourced" />
                <div className="compare-section"><h4>Manager screen</h4><strong>{opportunity.inference.managerReadiness ?? 'Unknown'} / 4</strong><p>{opportunity.inference.rationale}</p><EvidenceBadge state="inferred" /></div>
                <div className="compare-section"><h4>Applied caps</h4>{score.caps.length ? score.caps.map((cap) => <p key={cap.id}>{cap.cap} — {cap.label}</p>) : <p>None from available fields</p>}</div>
                <div className="compare-section"><h4>Top unknowns</h4><ul>{opportunity.unknowns.slice(0, 4).map((item) => <li key={item}>{item}</li>)}</ul><EvidenceBadge state="unknown" /></div>
              </article>
            )
          })}
        </div>
      </section>
    </div>
  )
}
