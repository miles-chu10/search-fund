import { BarChart3, CalendarClock, ClipboardCheck, GitCompareArrows, Landmark, Menu, Radar, Search, ShieldCheck, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { CapitalView } from './components/CapitalView'
import { ComparePanel } from './components/ComparePanel'
import { CriteriaPanel } from './components/CriteriaPanel'
import { DealDrawer } from './components/DealDrawer'
import { EvidenceLegend } from './components/EvidenceBadge'
import { OpportunityTable, type PipelineStage, type ScoredOpportunity } from './components/OpportunityTable'
import { ReadinessView } from './components/ReadinessView'
import { RefreshView } from './components/RefreshView'
import { industries, opportunities, regions } from './data/load'
import { DEFAULT_CRITERIA, scoreOpportunity } from './domain/scoring'
import type { AcquisitionCriteria, Opportunity } from './domain/schema'

type ViewId = 'pipeline' | 'readiness' | 'refresh' | 'capital'

const viewCopy: Record<ViewId, string> = {
  pipeline: 'Opportunity pipeline',
  readiness: 'Search readiness',
  refresh: 'Daily refresh',
  capital: 'Capital plan',
}

function App() {
  const [view, setView] = useState<ViewId>('pipeline')
  const [criteria, setCriteria] = useState<AcquisitionCriteria>(DEFAULT_CRITERIA)
  const [criteriaOpen, setCriteriaOpen] = useState(false)
  const [navOpen, setNavOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [memoOpportunity, setMemoOpportunity] = useState<Opportunity | null>(null)
  const [comparedIds, setComparedIds] = useState<string[]>([])
  const [comparisonOpen, setComparisonOpen] = useState(false)
  const [pipelineStages, setPipelineStages] = useState<Record<string, PipelineStage>>({})

  const scoredItems = useMemo<ScoredOpportunity[]>(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return opportunities
      .filter((opportunity) =>
        !normalizedQuery ||
        [opportunity.title, opportunity.industry, opportunity.location.label, opportunity.source.marketplace]
          .join(' ')
          .toLowerCase()
          .includes(normalizedQuery),
      )
      .map((opportunity) => ({
        opportunity,
        score: scoreOpportunity(opportunity, criteria),
        defaultScore: scoreOpportunity(opportunity, DEFAULT_CRITERIA),
      }))
      .sort((a, b) => {
        const thesisRank = { in_thesis: 0, needs_data: 1, out_of_thesis: 2 }
        return thesisRank[a.score.thesisStatus] - thesisRank[b.score.thesisStatus]
          || b.score.total - a.score.total
          || b.score.confidencePoints - a.score.confidencePoints
          || b.opportunity.source.retrievedAt.localeCompare(a.opportunity.source.retrievedAt)
      })
  }, [criteria, query])

  const inThesisCount = scoredItems.filter((item) => item.score.thesisStatus === 'in_thesis').length
  const needsDataCount = scoredItems.filter((item) => item.score.thesisStatus === 'needs_data').length
  const comparedOpportunities = comparedIds
    .map((id) => opportunities.find((opportunity) => opportunity.id === id))
    .filter((opportunity): opportunity is Opportunity => Boolean(opportunity))

  const toggleCompare = (id: string) => {
    setComparedIds((current) => {
      if (current.includes(id)) return current.filter((item) => item !== id)
      if (current.length >= 3) return [...current.slice(1), id]
      return [...current, id]
    })
  }

  const changeView = (nextView: ViewId) => {
    setView(nextView)
    setNavOpen(false)
  }

  return (
    <div className="app-shell">
      <nav className={`side-nav ${navOpen ? 'nav-open' : ''}`} aria-label="Primary navigation">
        <div className="brand-lockup"><div className="brand-mark"><Radar size={20} /></div><div><strong>Main Street</strong><span>Radar</span></div></div>
        <button className="nav-close icon-button" type="button" onClick={() => setNavOpen(false)} aria-label="Close navigation"><X size={18} /></button>
        <div className="nav-group">
          <button className={view === 'pipeline' ? 'active' : ''} type="button" onClick={() => changeView('pipeline')}><BarChart3 size={17} /><span>Pipeline</span><small>{opportunities.length}</small></button>
          <button className={view === 'readiness' ? 'active' : ''} type="button" onClick={() => changeView('readiness')}><ClipboardCheck size={17} /><span>Readiness</span><small>12 weeks</small></button>
          <button className={view === 'refresh' ? 'active' : ''} type="button" onClick={() => changeView('refresh')}><CalendarClock size={17} /><span>Refresh</span><small>Preview</small></button>
          <button className={view === 'capital' ? 'active' : ''} type="button" onClick={() => changeView('capital')}><Landmark size={17} /><span>Capital</span><small>3 paths</small></button>
        </div>
        <div className="nav-footer"><ShieldCheck size={16} /><p><strong>Lead screen only</strong><span>Not investment advice</span></p></div>
      </nav>

      <div className="main-shell">
        <header className="top-bar">
          <div className="top-left"><button className="mobile-menu icon-button" type="button" onClick={() => setNavOpen(true)} aria-label="Open navigation"><Menu size={18} /></button><span>{viewCopy[view]}</span></div>
          <div className="top-status"><span className="status-dot" /><p><strong>Demo dataset</strong><span>Exa-fetched Aug 3, 2026</span></p></div>
        </header>

        {view === 'pipeline' && (
          <div className="pipeline-layout">
            <CriteriaPanel
              criteria={criteria}
              industries={industries}
              regions={regions}
              open={criteriaOpen}
              onToggleOpen={() => setCriteriaOpen((current) => !current)}
              onChange={setCriteria}
              onReset={() => setCriteria(DEFAULT_CRITERIA)}
            />
            <main className="pipeline-main">
              <header className="pipeline-header">
                <div><span className="eyebrow">Current opportunity set</span><h1>Acquisition pipeline</h1><p>Rank unverified public leads for the next diligence question—not a buy decision.</p></div>
                <div className="pipeline-metrics"><div><strong>{inThesisCount}</strong><span>In thesis</span></div><div><strong>{needsDataCount}</strong><span>Need data</span></div><div><strong>{opportunities.length}</strong><span>Source-linked</span></div></div>
              </header>

              <div className="pipeline-toolbar">
                <label className="search-box"><Search size={16} aria-hidden="true" /><span className="sr-only">Search opportunities</span><input type="search" placeholder="Search title, industry, geography…" value={query} onChange={(event) => setQuery(event.target.value)} /></label>
                <EvidenceLegend />
                <button className="secondary-button" type="button" disabled={comparedIds.length < 2} onClick={() => setComparisonOpen(true)}><GitCompareArrows size={16} />Compare <span>{comparedIds.length}</span></button>
              </div>

              <div className="model-notice"><ShieldCheck size={15} /><p><strong>screen-v1.0</strong><span>Seven fixed categories total 100 points. Missing factors never reweight the model; caps and thesis gates remain visible.</span></p></div>

              {scoredItems.length ? (
                <OpportunityTable
                  items={scoredItems}
                  comparedIds={comparedIds}
                  pipelineStages={pipelineStages}
                  onToggleCompare={toggleCompare}
                  onOpenMemo={setMemoOpportunity}
                  onStageChange={(id, stage) => setPipelineStages((current) => ({ ...current, [id]: stage }))}
                />
              ) : (
                <div className="empty-state"><Search size={22} /><h2>No matching leads</h2><p>Clear the search to restore the source-linked demo set.</p></div>
              )}
            </main>
          </div>
        )}

        {view === 'readiness' && <ReadinessView />}
        {view === 'refresh' && <RefreshView />}
        {view === 'capital' && <CapitalView opportunities={opportunities} maximumEquityCheck={criteria.maximumEquityCheck} />}
      </div>

      {memoOpportunity && (
        <DealDrawer
          opportunity={memoOpportunity}
          score={scoreOpportunity(memoOpportunity, criteria)}
          defaultScore={scoreOpportunity(memoOpportunity, DEFAULT_CRITERIA)}
          onClose={() => setMemoOpportunity(null)}
        />
      )}

      {comparisonOpen && (
        <ComparePanel
          opportunities={comparedOpportunities}
          criteria={criteria}
          onRemove={toggleCompare}
          onClose={() => setComparisonOpen(false)}
        />
      )}
    </div>
  )
}

export default App
