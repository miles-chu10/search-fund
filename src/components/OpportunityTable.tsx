import { ArrowUpRight, ChevronRight, GitCompareArrows } from 'lucide-react'
import type { Opportunity } from '../domain/schema'
import type { ScoreResult } from '../domain/scoring'
import { formatDate, formatMoney } from '../domain/format'
import { EvidenceBadge } from './EvidenceBadge'

export type PipelineStage = 'New lead' | 'Enrich' | 'Partner review' | 'Hold'

export interface ScoredOpportunity {
  opportunity: Opportunity
  score: ScoreResult
  defaultScore: ScoreResult
}

interface OpportunityTableProps {
  items: ScoredOpportunity[]
  comparedIds: string[]
  pipelineStages: Record<string, PipelineStage>
  onToggleCompare: (id: string) => void
  onOpenMemo: (opportunity: Opportunity) => void
  onStageChange: (id: string, stage: PipelineStage) => void
}

const statusCopy = {
  in_thesis: 'In thesis',
  out_of_thesis: 'Out of thesis',
  needs_data: 'Needs data',
}

export function OpportunityTable({
  items,
  comparedIds,
  pipelineStages,
  onToggleCompare,
  onOpenMemo,
  onStageChange,
}: OpportunityTableProps) {
  return (
    <div className="opportunity-table-wrap">
      <table className="opportunity-table">
        <thead>
          <tr>
            <th className="compare-column"><span className="sr-only">Compare</span></th>
            <th>Opportunity</th>
            <th>Screen</th>
            <th>Reported economics</th>
            <th>Evidence & risk</th>
            <th>Pipeline</th>
            <th><span className="sr-only">Open memo</span></th>
          </tr>
        </thead>
        <tbody>
          {items.map(({ opportunity, score, defaultScore }) => {
            const scoreDelta = score.total - defaultScore.total
            const earnings = opportunity.facts.earnings
            return (
              <tr key={opportunity.id} data-testid="opportunity-row">
                <td className="compare-column" data-label="Compare">
                  <label className="compare-check" title="Add to comparison">
                    <input
                      type="checkbox"
                      checked={comparedIds.includes(opportunity.id)}
                      onChange={() => onToggleCompare(opportunity.id)}
                      aria-label={`Compare ${opportunity.title}`}
                    />
                    <GitCompareArrows size={15} aria-hidden="true" />
                  </label>
                </td>
                <td data-label="Opportunity">
                  <div className="opportunity-title-cell">
                    <div className="opportunity-source-line">
                      <span className={`tier tier-${opportunity.tier}`}>Tier {opportunity.tier}</span>
                      <span>{opportunity.source.marketplace}</span>
                      <span>#{opportunity.source.listingId}</span>
                    </div>
                    <button className="title-link" type="button" onClick={() => onOpenMemo(opportunity)}>
                      {opportunity.title}
                    </button>
                    <div className="muted-line">
                      <span>{opportunity.location.label}</span>
                      <span>•</span>
                      <span>{opportunity.industry}</span>
                    </div>
                    <a className="source-link" href={opportunity.source.canonicalUrl} target="_blank" rel="noreferrer">
                      Source retrieved {formatDate(opportunity.source.retrievedAt)}
                      <ArrowUpRight size={12} aria-hidden="true" />
                    </a>
                  </div>
                </td>
                <td data-label="Screen">
                  <div className="score-cell">
                    <span className="score-number">{score.total}</span>
                    <div>
                      <span className={`status-pill status-${score.thesisStatus}`}>{statusCopy[score.thesisStatus]}</span>
                      <small>{score.band}</small>
                    </div>
                  </div>
                  <span className={`score-delta ${scoreDelta === 0 ? 'score-stable' : ''}`}>
                    {scoreDelta === 0 ? 'No score move' : `${scoreDelta > 0 ? '+' : ''}${scoreDelta} vs default thesis`}
                  </span>
                  {score.caps.length > 0 && <span className="cap-note">Cap: {Math.min(...score.caps.map((cap) => cap.cap))}</span>}
                </td>
                <td data-label="Reported economics">
                  <dl className="economics-list">
                    <div><dt>Ask</dt><dd>{formatMoney(opportunity.facts.askingPrice)}</dd></div>
                    <div><dt>Revenue</dt><dd>{formatMoney(opportunity.facts.revenue)}</dd></div>
                    <div>
                      <dt>{earnings?.sourceLabel ?? 'Earnings'}</dt>
                      <dd>{formatMoney(earnings?.value ?? null)}</dd>
                    </div>
                  </dl>
                  <EvidenceBadge state="sourced" compact />
                </td>
                <td data-label="Evidence & risk">
                  <div className="evidence-cell">
                    <div>
                      <EvidenceBadge state="inferred" compact />
                      <span>{opportunity.inference.managerReadiness === null ? 'Manager fit unknown' : `Manager screen ${opportunity.inference.managerReadiness}/4`}</span>
                    </div>
                    <div>
                      <EvidenceBadge state="unknown" compact />
                      <span>{opportunity.unknowns.length} open fields</span>
                    </div>
                    <span className="risk-line">{opportunity.inference.flags[0]}</span>
                  </div>
                </td>
                <td data-label="Pipeline">
                  <select
                    className="stage-select"
                    aria-label={`Pipeline stage for ${opportunity.title}`}
                    value={pipelineStages[opportunity.id] ?? 'New lead'}
                    onChange={(event) => onStageChange(opportunity.id, event.target.value as PipelineStage)}
                  >
                    <option>New lead</option>
                    <option>Enrich</option>
                    <option>Partner review</option>
                    <option>Hold</option>
                  </select>
                </td>
                <td className="row-action" data-label="Memo">
                  <button className="icon-button" type="button" onClick={() => onOpenMemo(opportunity)} aria-label={`Open deal memo for ${opportunity.title}`} title="Open deal memo">
                    <ChevronRight size={18} aria-hidden="true" />
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
