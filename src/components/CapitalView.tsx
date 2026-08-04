import { CircleAlert, Landmark, Scale, ShieldCheck } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { Opportunity } from '../domain/schema'
import { formatMoney } from '../domain/format'

type ScenarioId = 'self-funded' | 'traditional-search' | 'independent-sponsor'

const scenarioDefinitions = {
  'self-funded': {
    label: 'Self-funded / SBA-style',
    equityLabel: 'Buyer cash',
    sources: [
      ['Illustrative senior debt', 0.7],
      ['Illustrative seller note', 0.05],
      ['Buyer cash', 0.25],
    ] as const,
  },
  'traditional-search': {
    label: 'Traditional search',
    equityLabel: 'Operator co-invest',
    sources: [
      ['Illustrative acquisition debt', 0.65],
      ['Outside acquisition equity', 0.25],
      ['Operator co-invest', 0.1],
    ] as const,
  },
  'independent-sponsor': {
    label: 'Independent sponsor',
    equityLabel: 'Sponsor co-invest',
    sources: [
      ['Illustrative acquisition debt', 0.65],
      ['Outside deal equity', 0.25],
      ['Sponsor co-invest', 0.05],
      ['Illustrative seller paper', 0.05],
    ] as const,
  },
}

interface CapitalViewProps {
  opportunities: Opportunity[]
  maximumEquityCheck: number
}

export function CapitalView({ opportunities, maximumEquityCheck }: CapitalViewProps) {
  const [selectedId, setSelectedId] = useState(opportunities[0].id)
  const [scenarioId, setScenarioId] = useState<ScenarioId>('self-funded')
  const [stressRevenue, setStressRevenue] = useState(true)
  const [stressManager, setStressManager] = useState(true)
  const [stressRate, setStressRate] = useState(false)
  const opportunity = opportunities.find((item) => item.id === selectedId) ?? opportunities[0]
  const scenario = scenarioDefinitions[scenarioId]

  const model = useMemo(() => {
    const price = opportunity.facts.askingPrice ?? 0
    const uses = [
      ['Purchase consideration', price],
      ['Transaction + financing cost placeholder', price * 0.05],
      ['Initial working capital placeholder', price * 0.03],
      ['Transition + manager placeholder', price * 0.02],
      ['Contingency placeholder', price * 0.02],
    ] as const
    const totalUses = uses.reduce((sum, [, value]) => sum + value, 0)
    const sources = scenario.sources.map(([label, ratio]) => [label, totalUses * ratio] as const)
    const totalSources = sources.reduce((sum, [, value]) => sum + value, 0)
    const equityCheck = sources.find(([label]) => label === scenario.equityLabel)?.[1] ?? 0
    return { uses, totalUses, sources, totalSources, equityCheck, gap: totalUses - totalSources }
  }, [opportunity, scenario])

  return (
    <div className="content-view capital-view">
      <header className="view-header">
        <div><span className="eyebrow">Scenario—not advice</span><h1>Capital planning preview</h1><p>Build uses first, then test illustrative branches. No scenario represents lender approval, investor interest, or a recommended structure.</p></div>
        <span className="preview-pill"><Scale size={14} /> Illustrative</span>
      </header>

      <div className="capital-toolbar">
        <label>Opportunity<select value={selectedId} onChange={(event) => setSelectedId(event.target.value)}>{opportunities.map((item) => <option value={item.id} key={item.id}>{item.title}</option>)}</select></label>
        <div className="scenario-tabs" role="group" aria-label="Capital scenario">
          {(Object.entries(scenarioDefinitions) as [ScenarioId, (typeof scenarioDefinitions)[ScenarioId]][]).map(([id, definition]) => (
            <button type="button" key={id} className={scenarioId === id ? 'active' : ''} onClick={() => setScenarioId(id)}>{definition.label}</button>
          ))}
        </div>
      </div>

      {opportunity.facts.askingPrice === null ? (
        <div className="capital-blocker"><CircleAlert size={18} /><p><strong>Asking price is unknown.</strong><span>Sources and uses remain unavailable; request price before treating this as an on-market capital case.</span></p></div>
      ) : (
        <div className="capital-grid">
          <section className="capital-ledger"><div className="section-heading"><div><span className="eyebrow">Step 1</span><h2>Illustrative uses</h2></div><span>{formatMoney(model.totalUses)}</span></div><div className="ledger-list">{model.uses.map(([label, value]) => <div key={label}><span>{label}</span><strong>{formatMoney(value)}</strong></div>)}<div className="ledger-total"><span>Total uses</span><strong>{formatMoney(model.totalUses)}</strong></div></div></section>
          <section className="capital-ledger"><div className="section-heading"><div><span className="eyebrow">Step 2</span><h2>Illustrative sources</h2></div><span>{formatMoney(model.totalSources)}</span></div><div className="ledger-list">{model.sources.map(([label, value]) => <div key={label}><span>{label}</span><strong>{formatMoney(value)}</strong></div>)}<div className="ledger-total"><span>Funding gap</span><strong>{formatMoney(model.gap)}</strong></div></div></section>
        </div>
      )}

      {opportunity.facts.askingPrice === null ? (
        <section className="equity-gate-section equity-gate-unavailable">
          <div><Landmark size={20} /><p><span className="eyebrow">Equity gate</span><strong>Unavailable</strong><span>An asking price is required before any equity-check screen can run.</span></p></div>
          <span className="equity-status unavailable">Needs price</span>
        </section>
      ) : (
        <section className="equity-gate-section">
          <div><Landmark size={20} /><p><span className="eyebrow">Equity gate</span><strong>{scenario.equityLabel}: {formatMoney(model.equityCheck)}</strong><span>Active maximum: {formatMoney(maximumEquityCheck)}</span></p></div>
          <span className={`equity-status ${model.equityCheck <= maximumEquityCheck ? 'within' : 'over'}`}>{model.equityCheck <= maximumEquityCheck ? 'Within active screen' : 'Above active screen'}</span>
        </section>
      )}

      <div className="capital-detail-grid">
        <section className="stress-panel"><span className="eyebrow">Editable internal planning case</span><h2>Stress toggles</h2><label><input type="checkbox" checked={stressRevenue} onChange={(event) => setStressRevenue(event.target.checked)} /><span><strong>Revenue -10%</strong><small>Not a forecast</small></span></label><label><input type="checkbox" checked={stressManager} onChange={(event) => setStressManager(event.target.checked)} /><span><strong>Replacement manager cash cost +15%</strong><small>Input is still unknown</small></span></label><label><input type="checkbox" checked={stressRate} onChange={(event) => setStressRate(event.target.checked)} /><span><strong>Floating rate +200 bps</strong><small>No debt terms entered</small></span></label><div className="unavailable-output"><CircleAlert size={16} /><p><strong>DSCR and MACF unavailable</strong><span>Manager cost, maintenance capex, working-capital investment, and target-specific debt terms are not sourced. Zero is not assumed.</span></p></div></section>
        <section className="stage-panel"><span className="eyebrow">Evidence-gated progression</span><h2>{scenario.label}</h2><ol><li className="current"><strong>Illustrative</strong><span>Internal assumptions only</span></li><li><strong>Pre-screened</strong><span>Target-specific lender or investor screen</span></li><li><strong>Indicated</strong><span>Written nonbinding evidence</span></li><li><strong>Committed</strong><span>Executed commitments and mapped conditions</span></li><li><strong>Funded</strong><span>Closing readback only</span></li></ol></section>
      </div>

      <section className="capital-caveat"><ShieldCheck size={18} /><p><strong>Planning boundary</strong><span>Capital scenarios are not legal, tax, lending, securities, accounting, or investment advice. SBA eligibility and terms must be checked with a current lender and program sources. Investor structures and communications require qualified securities counsel. The prototype does not solicit capital or generate offering documents.</span></p></section>
    </div>
  )
}
