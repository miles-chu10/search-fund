import { ArrowRight, CalendarClock, Check, CircleDashed, Database, Search, ShieldCheck } from 'lucide-react'

const steps = [
  { label: 'Search', detail: 'Exa primary discovery', icon: Search },
  { label: 'Fetch + validate', detail: 'Canonical page + Parallel secondary check', icon: ShieldCheck },
  { label: 'Normalize', detail: 'Field state + raw label retained', icon: Database },
  { label: 'Dedupe', detail: 'Source + listing ID; URL hash fallback', icon: Check },
  { label: 'Detect changes', detail: 'Material fields and status', icon: CircleDashed },
  { label: 'Score', detail: 'screen-v1.0 + thesis version', icon: ShieldCheck },
  { label: 'Brief', detail: 'New or changed leads only', icon: CalendarClock },
]

export function RefreshView() {
  return (
    <div className="content-view refresh-view">
      <header className="view-header">
        <div><span className="eyebrow">Workflow architecture preview</span><h1>Daily sourcing & briefing</h1><p>A credential-free contract for a future managed refresh. No connector or schedule is active in this demo.</p></div>
        <span className="preview-pill"><CircleDashed size={14} /> Preview only</span>
      </header>

      <section className="schedule-strip">
        <div><CalendarClock size={19} /><p><strong>Weekdays • 7:30 AM</strong><span>America/Los_Angeles</span></p></div>
        <div><p><strong>Daily brief</strong><span>New + materially changed in-thesis leads</span></p></div>
        <div><p><strong>Weekly rollup</strong><span>Movement, gaps, stage counts; unchanged noise suppressed</span></p></div>
      </section>

      <section className="workflow-section">
        <div className="section-heading"><div><span className="eyebrow">Refresh contract</span><h2>Search → brief</h2></div><span className="run-stamp">Demo run: 10 retained • 5 rejected</span></div>
        <div className="workflow-flow">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div className="flow-pair" key={step.label}>
                <div className="flow-step"><Icon size={18} /><strong>{step.label}</strong><span>{step.detail}</span></div>
                {index < steps.length - 1 && <ArrowRight className="flow-arrow" size={17} aria-hidden="true" />}
              </div>
            )
          })}
        </div>
      </section>

      <div className="architecture-grid">
        <section className="architecture-panel">
          <span className="panel-number">01</span><h2>Discovery and validation</h2>
          <dl className="architecture-list">
            <div><dt>Exa</dt><dd><strong>Primary</strong><span>On-market discovery and canonical public-page fetch.</span></dd></div>
            <div><dt>Parallel Search</dt><dd><strong>Secondary</strong><span>Validation and enrichment; duplicate engine hits are not independent corroboration.</span></dd></div>
            <div><dt>Failure behavior</dt><dd><strong>Fail visible</strong><span>Blocked or missing pages enter review; rows are never silently deleted.</span></dd></div>
          </dl>
        </section>
        <section className="architecture-panel">
          <span className="panel-number">02</span><h2>Proposed source of truth</h2>
          <dl className="architecture-list">
            <div><dt>Airtable</dt><dd><strong>Future system</strong><span>Proposed persistent deal record; no base exists in this prototype.</span></dd></div>
            <div><dt>Primary key</dt><dd><strong>Source + listing ID</strong><span>Fallback: canonical URL hash when no stable listing ID exists.</span></dd></div>
            <div><dt>Field lineage</dt><dd><strong>Append observations</strong><span>Retain publisher, URL, retrieval date, raw label, and conflicts.</span></dd></div>
          </dl>
        </section>
        <section className="architecture-panel future-panel">
          <span className="panel-number">03</span><h2>Proprietary pipeline</h2>
          <dl className="architecture-list">
            <div><dt>Clay</dt><dd><strong>Future only</strong><span>May add off-market company research through the same schema.</span></dd></div>
            <div><dt>Seller intent</dt><dd><strong>Unknown by default</strong><span>A company record is not a business-for-sale lead without evidence.</span></dd></div>
            <div><dt>Outreach</dt><dd><strong>Not configured</strong><span>No contacts, enrichment credits, messaging, or account mutation.</span></dd></div>
          </dl>
        </section>
      </div>

      <section className="contract-table-section">
        <div className="section-heading"><div><span className="eyebrow">Change contract</span><h2>What creates a brief item</h2></div></div>
        <div className="contract-table-wrap"><table className="contract-table"><thead><tr><th>Event</th><th>System behavior</th><th>Partner brief</th></tr></thead><tbody>
          <tr><td>New canonical lead</td><td>Normalize, dedupe, score, store first-seen date</td><td>Include when in thesis; show critical gaps</td></tr>
          <tr><td>Price, earnings, status, or management change</td><td>Append observation, diff material fields, re-score</td><td>Show previous → current and score/cap movement</td></tr>
          <tr><td>Thesis or screen version changes</td><td>Persist old/new versions and deterministic score inputs</td><td>Label model-driven movement separately</td></tr>
          <tr><td>Fetch blocked or conflicting</td><td>Keep prior row, mark needs review, preserve both observations</td><td>Surface coverage gap; never imply current availability</td></tr>
          <tr><td>Unchanged record</td><td>Update successful retrieval metadata only</td><td>Suppress from daily brief; count in weekly coverage</td></tr>
        </tbody></table></div>
      </section>
    </div>
  )
}
