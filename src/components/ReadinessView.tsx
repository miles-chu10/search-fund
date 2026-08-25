import {
  Briefcase,
  CheckCircle2,
  CircleAlert,
  ClipboardList,
  FileText,
  Gauge,
  Lock,
  Route,
  ShieldCheck,
  Target,
} from 'lucide-react'
import { useState } from 'react'
import { prelaunch } from '../data/prelaunch'
import { formatMoney } from '../domain/format'

type SectionId = 'strategy' | 'roadmap' | 'operations' | 'templates' | 'evidence'

const sectionLabels: Record<SectionId, string> = {
  strategy: 'Strategy & paths',
  roadmap: '12-week roadmap',
  operations: 'Operating cockpit',
  templates: 'Diligence & drafts',
  evidence: 'Evidence & demo',
}

const pathStatus = (pathId: string) =>
  pathId === prelaunch.recommendedPath.id ? 'Starting hypothesis' : 'Open alternative'

const sourceFacts = [
  'The 2026 Stanford study covers core U.S. and Canadian search funds through December 31, 2025.',
  'Official aggregate performance is historical population evidence, not a personal probability or forecast.',
  'SBA 7(a) may support a qualifying ownership change, but only a lender can assess a borrower, target, structure, and terms.',
  'Capital communications, transaction-based compensation, and M&A activity can create securities or broker-dealer questions for qualified counsel.',
]

const validationTasks = [
  'Define a usable search thesis without filling unknowns favorably.',
  'Explain why one lead is capped and name the next evidence request.',
  'Interpret a KPI denominator and a source-coverage failure.',
  'Find the correct diligence folder without exposing gated material.',
  'Explain why an illustrative capital output is unavailable or non-decision-grade.',
]

const honestClaims = [
  'Built a TypeScript/React acquisition-screening prototype with deterministic scoring, explicit missing-data caps, and source provenance.',
  'Designed an evidence-gated preparation workflow spanning sourcing, CRM stages, diligence, risk decisions, and illustrative capital paths.',
  'Added credential-free fixtures plus automated lint, typecheck, unit, provenance, build, and browser checks.',
]

const claimsToAvoid = [
  'No claim of live daily sourcing, production CRM, proprietary deal flow, or seller interest.',
  'No claim of SBA eligibility, financing qualification, investor backing, or available capital.',
  'No claim of product-market fit, clients, revenue, acquisitions, improved returns, or reduced diligence risk.',
]

export function ReadinessView() {
  const [section, setSection] = useState<SectionId>('strategy')
  const [draftedInputs, setDraftedInputs] = useState<string[]>([])
  const highRisks = prelaunch.risks.filter((risk) => risk.riskScore >= 15)

  const toggleDrafted = (id: string) => {
    setDraftedInputs((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    )
  }

  return (
    <div className="content-view readiness-view">
      <header className="view-header">
        <div>
          <span className="eyebrow">Local, decision-gated pre-launch workspace</span>
          <h1>Search Readiness OS</h1>
          <p>Turn the existing lead screen into a disciplined preparation system without implying that a fund, financing, investor, seller, or acquisition exists.</p>
        </div>
        <span className="preview-pill"><Lock size={14} /> No external actions</span>
      </header>

      <section className="readiness-status-strip" aria-label="Readiness status">
        <div>
          <Target size={18} />
          <p><strong>{draftedInputs.length}/{prelaunch.decisionInputs.length} inputs drafted</strong><span>Local checklist only; G1 approval still required</span></p>
        </div>
        <div>
          <Route size={18} />
          <p><strong>{prelaunch.recommendedPath.label}</strong><span>Recommendation hypothesis • three paths stay open</span></p>
        </div>
        <div>
          <Briefcase size={18} />
          <p><strong>{prelaunch.flagship.name}</strong><span>Web demo + {prelaunch.flagship.service}</span></p>
        </div>
      </section>

      <div className="readiness-tabs" role="tablist" aria-label="Readiness workspace sections">
        {(Object.entries(sectionLabels) as [SectionId, string][]).map(([id, label]) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={section === id}
            className={section === id ? 'active' : ''}
            onClick={() => setSection(id)}
          >
            {label}
          </button>
        ))}
      </div>

      {section === 'strategy' && (
        <div className="readiness-section" role="tabpanel">
          <section className="boundary-callout">
            <CircleAlert size={18} />
            <p><strong>Working hypothesis, not Miles’s approved thesis</strong><span>{prelaunch.recommendedPath.boundary}</span></p>
          </section>

          <div className="hypothesis-grid">
            <section>
              <span className="eyebrow">Geography</span>
              <h2>{prelaunch.strategyHypothesis.geography}</h2>
              <p>Location and relocation constraints remain open.</p>
            </section>
            <section>
              <span className="eyebrow">Illustrative earnings band</span>
              <h2>{prelaunch.strategyHypothesis.earningsRange.basis} {formatMoney(prelaunch.strategyHypothesis.earningsRange.minimum)}–{formatMoney(prelaunch.strategyHypothesis.earningsRange.maximum)}</h2>
              <p>No SDE/EBITDA conversion; screen-v1.0 enforces only its current minimum gate.</p>
            </section>
            <section>
              <span className="eyebrow">Illustrative enterprise value</span>
              <h2>{formatMoney(prelaunch.strategyHypothesis.enterpriseValueRange.minimum)}–{formatMoney(prelaunch.strategyHypothesis.enterpriseValueRange.maximum)}</h2>
              <p>A future strategy input, not a current score gate or capital capacity claim.</p>
            </section>
            <section>
              <span className="eyebrow">Industry starting set</span>
              <h2>{prelaunch.strategyHypothesis.industries.join(' • ')}</h2>
              <p>These are recommended filters to pressure-test, not approved targets.</p>
            </section>
          </div>

          <div className="strategy-detail-grid">
            <section className="readiness-panel">
              <div className="section-heading"><div><span className="eyebrow">Quality screen</span><h2>Required characteristics</h2></div><ShieldCheck size={18} /></div>
              <ul className="readiness-list">
                {prelaunch.strategyHypothesis.requiredCharacteristics.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </section>
            <section className="readiness-panel">
              <div className="section-heading"><div><span className="eyebrow">Fail-closed</span><h2>Exclusions and holds</h2></div><CircleAlert size={18} /></div>
              <ul className="readiness-list risk-list">
                {prelaunch.strategyHypothesis.exclusions.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </section>
          </div>

          <section className="readiness-panel decision-input-panel">
            <div className="section-heading"><div><span className="eyebrow">G1 strategy gate</span><h2>Miles-owned inputs</h2></div><span>{draftedInputs.length} drafted • 0 approved</span></div>
            <p className="panel-intro">Checking an item records only that a private or public-safe draft exists in this browser session. It does not store the value, approve the strategy, or prove capital capacity.</p>
            <div className="decision-input-grid">
              {prelaunch.decisionInputs.map((input) => (
                <label key={input.id} className={draftedInputs.includes(input.id) ? 'drafted' : ''}>
                  <input
                    type="checkbox"
                    checked={draftedInputs.includes(input.id)}
                    onChange={() => toggleDrafted(input.id)}
                    aria-label={`Mark ${input.label} drafted`}
                  />
                  <span><strong>{input.label}</strong><small>{input.sensitive ? 'Private input • do not store raw records here' : `${input.category} decision`}</small></span>
                  <em>{draftedInputs.includes(input.id) ? 'Drafted' : 'Open'}</em>
                </label>
              ))}
            </div>
          </section>

          <div className="path-grid">
            {prelaunch.paths.map((path) => (
              <section className={`path-panel ${path.id === prelaunch.recommendedPath.id ? 'recommended' : ''}`} key={path.id}>
                <div className="path-heading"><div><span className="eyebrow">{pathStatus(path.id)}</span><h2>{path.label}</h2></div>{path.id === prelaunch.recommendedPath.id && <CheckCircle2 size={19} />}</div>
                <div className="runway-number"><strong>{formatMoney(path.illustrativeRunway.total)}</strong><span>illustrative search runway</span></div>
                <p>{path.illustrativeRunway.months} × ({formatMoney(path.illustrativeRunway.monthlyPersonalBurn)} personal burn + {formatMoney(path.illustrativeRunway.monthlySearchOverhead)} search overhead) + reserves and setup.</p>
                <h3>Dependencies</h3>
                <ul>{path.dependencies.map((dependency) => <li key={dependency}>{dependency}</li>)}</ul>
                <div className="path-gates"><p><strong>Continue</strong><span>{path.continueCriteria}</span></p><p><strong>Stop / reduce</strong><span>{path.stopCriteria}</span></p></div>
                <small>{path.evidenceMaturity}</small>
              </section>
            ))}
          </div>
        </div>
      )}

      {section === 'roadmap' && (
        <div className="readiness-section" role="tabpanel">
          <section className="roadmap-heading">
            <div><span className="eyebrow">Preparation, not launch</span><h2>Twelve weeks to an evidence-based go / pause decision</h2></div>
            <p>No week authorizes fundraising, outreach, financing, entity formation, publication, or an acquisition commitment.</p>
          </section>
          <ol className="roadmap-grid">
            {prelaunch.roadmap.map((item) => (
              <li key={item.week}>
                <span>{String(item.week).padStart(2, '0')}</span>
                <div><h3>{item.outcome}</h3><p>{item.acceptance}</p></div>
              </li>
            ))}
          </ol>
          <section className="readiness-panel cadence-panel">
            <div className="section-heading"><div><span className="eyebrow">Illustrative capacity</span><h2>Weekly operating cadence</h2></div></div>
            <div className="readiness-table-wrap"><table className="readiness-table"><thead><tr><th>When</th><th>Time box</th><th>Activity</th><th>Output</th></tr></thead><tbody>
              {prelaunch.weeklyCadence.map((item) => <tr key={`${item.when}-${item.activity}`}><td>{item.when}</td><td>{item.minutes} min</td><td>{item.activity}</td><td>{item.output}</td></tr>)}
            </tbody></table></div>
          </section>
        </div>
      )}

      {section === 'operations' && (
        <div className="readiness-section" role="tabpanel">
          <section className="readiness-panel">
            <div className="section-heading"><div><span className="eyebrow">Exact formulas</span><h2>Sourcing funnel and KPIs</h2></div><Gauge size={19} /></div>
            <div className="readiness-table-wrap"><table className="readiness-table kpi-table"><thead><tr><th>KPI</th><th>Formula</th><th>Zero denominator</th><th>Interpretation boundary</th></tr></thead><tbody>
              {prelaunch.kpis.map((kpi) => <tr key={kpi.id}><td>{kpi.label}</td><td><code>{kpi.formula}</code></td><td>{kpi.zeroDenominator}</td><td>{kpi.boundary}</td></tr>)}
            </tbody></table></div>
          </section>
          <div className="operations-grid">
            <section className="readiness-panel">
              <div className="section-heading"><div><span className="eyebrow">Human-owned progression</span><h2>Decision gates</h2></div><ClipboardList size={18} /></div>
              <div className="gate-stack">
                {prelaunch.decisionGates.map((gate) => <div key={gate.id} className={`readiness-gate ${gate.status}`}><strong>{gate.id}</strong><p><span>{gate.requiredEvidence}</span><small>{gate.owner}</small></p><em>{gate.status.replaceAll('_', ' ')}</em></div>)}
              </div>
            </section>
            <section className="readiness-panel">
              <div className="section-heading"><div><span className="eyebrow">Ranked by impact × likelihood</span><h2>Priority risks</h2></div><ShieldCheck size={18} /></div>
              <div className="risk-stack">
                {highRisks.map((risk) => <div key={risk.id}><span>{risk.riskScore}</span><p><strong>{risk.statement}</strong><small>{risk.mitigation}</small></p></div>)}
              </div>
            </section>
          </div>
        </div>
      )}

      {section === 'templates' && (
        <div className="readiness-section" role="tabpanel">
          <section className="boundary-callout draft-boundary"><Lock size={18} /><p><strong>Draft-only and synthetic</strong><span>Every template has draftOnly: true and sentAt: null. There is no recipient data, approval record, connector, queue, or send control.</span></p></section>
          <div className="template-grid">
            {prelaunch.outreachTemplates.map((template) => (
              <article key={template.id} className="template-panel">
                <header><div><span className="eyebrow">{template.audience.replaceAll('_', ' ')}</span><h2>{template.subject}</h2></div><span>Unsent</span></header>
                <p>{template.body}</p>
                <footer><code>{template.id}</code><span>sentAt: null</span></footer>
              </article>
            ))}
          </div>
          <section className="readiness-panel diligence-panel">
            <div className="section-heading"><div><span className="eyebrow">Privacy-safe index</span><h2>Diligence and data-room map</h2></div><FileText size={19} /></div>
            <p className="panel-intro">The repository stores only request status, source pointers, dates, versions, and hashes. Tax records, bank data, credentials, gated seller files, and raw personal data stay outside git in an approved secure location.</p>
            <div className="folder-grid">
              {prelaunch.diligenceFolders.map((folder) => <div key={folder.id}><code>{folder.id}</code><p>{folder.purpose}</p></div>)}
            </div>
          </section>
        </div>
      )}

      {section === 'evidence' && (
        <div className="readiness-section" role="tabpanel">
          <div className="evidence-summary-grid">
            <section className="readiness-panel">
              <div className="section-heading"><div><span className="eyebrow">Current landscape</span><h2>What the sources support</h2></div><ShieldCheck size={18} /></div>
              <ul className="readiness-list">{sourceFacts.map((fact) => <li key={fact}>{fact}</li>)}</ul>
            </section>
            <section className="readiness-panel">
              <div className="section-heading"><div><span className="eyebrow">Target-user plan</span><h2>Five validation tasks</h2></div><Target size={18} /></div>
              <ol className="validation-list">{validationTasks.map((task) => <li key={task}>{task}</li>)}</ol>
              <p className="validation-bar"><strong>Iteration bar</strong><span>4 of 5 intended users complete 4 of 5 tasks without coaching; passing still does not prove demand or willingness to pay.</span></p>
            </section>
          </div>

          <div className="claims-grid">
            <section className="readiness-panel allowed-claims"><h2>Honest after checks pass</h2><ul>{honestClaims.map((claim) => <li key={claim}>{claim}</li>)}</ul></section>
            <section className="readiness-panel prohibited-claims"><h2>Not established</h2><ul>{claimsToAvoid.map((claim) => <li key={claim}>{claim}</li>)}</ul></section>
          </div>

          <section className="readiness-panel sources-panel">
            <div className="section-heading"><div><span className="eyebrow">Accessed {prelaunch.asOf}</span><h2>Authoritative source register</h2></div><span>{prelaunch.sources.length} sources</span></div>
            <div className="readiness-table-wrap"><table className="readiness-table"><thead><tr><th>Source</th><th>Class</th><th>Supports</th></tr></thead><tbody>
              {prelaunch.sources.map((source) => <tr key={source.id}><td><a href={source.url} target="_blank" rel="noreferrer">{source.id} · {source.title}</a><small>{source.publisher} • {source.publishedAt}</small></td><td>{source.classification.replaceAll('_', ' ')}</td><td>{source.supports}</td></tr>)}
            </tbody></table></div>
          </section>
        </div>
      )}

      <section className="capital-caveat readiness-caveat"><ShieldCheck size={18} /><p><strong>Professional boundary</strong><span>This workspace is planning support, not legal, tax, securities, broker-dealer, accounting, lending, or investment advice. Qualified professionals must review any real structure, compensation, solicitation, financing, diligence conclusion, or transaction.</span></p></section>
    </div>
  )
}
