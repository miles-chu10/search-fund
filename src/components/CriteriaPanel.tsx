import { RotateCcw, SlidersHorizontal } from 'lucide-react'
import type { AcquisitionCriteria } from '../domain/schema'
import { formatMoney } from '../domain/format'

interface CriteriaPanelProps {
  criteria: AcquisitionCriteria
  industries: string[]
  regions: string[]
  open: boolean
  onToggleOpen: () => void
  onChange: (criteria: AcquisitionCriteria) => void
  onReset: () => void
}

const toggleValue = (values: string[], value: string) =>
  values.includes(value) ? values.filter((item) => item !== value) : [...values, value]

export function CriteriaPanel({
  criteria,
  industries,
  regions,
  open,
  onToggleOpen,
  onChange,
  onReset,
}: CriteriaPanelProps) {
  return (
    <aside className={`criteria-panel ${open ? 'criteria-open' : ''}`} aria-label="Acquisition criteria">
      <button className="criteria-mobile-toggle" type="button" onClick={onToggleOpen} aria-expanded={open}>
        <SlidersHorizontal size={17} aria-hidden="true" />
        Acquisition criteria
        <span>{open ? 'Close' : 'Edit'}</span>
      </button>

      <div className="criteria-content">
        <div className="section-heading criteria-heading">
          <div>
            <span className="eyebrow">Live thesis</span>
            <h2>Acquisition criteria</h2>
          </div>
          <button className="icon-button" type="button" onClick={onReset} aria-label="Reset criteria" title="Reset criteria">
            <RotateCcw size={16} aria-hidden="true" />
          </button>
        </div>

        <fieldset className="criteria-field">
          <legend>Target geography</legend>
          <p>Known nonmatches stay searchable, but leave the ranked brief.</p>
          <div className="check-grid">
            {regions.map((region) => (
              <label key={region} className="check-control">
                <input
                  type="checkbox"
                  checked={criteria.targetGeographies.includes(region)}
                  onChange={() =>
                    onChange({
                      ...criteria,
                      targetGeographies: toggleValue(criteria.targetGeographies, region),
                    })
                  }
                />
                <span>{region}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="criteria-field">
          <legend>Included industries</legend>
          <div className="check-grid">
            {industries.map((industry) => (
              <label key={industry} className="check-control">
                <input
                  type="checkbox"
                  checked={criteria.includedIndustries.includes(industry)}
                  onChange={() =>
                    onChange({
                      ...criteria,
                      includedIndustries: toggleValue(criteria.includedIndustries, industry),
                    })
                  }
                />
                <span>{industry}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="criteria-field">
          <legend>Excluded industries</legend>
          <div className="check-grid">
            {industries.map((industry) => (
              <label key={industry} className="check-control">
                <input
                  type="checkbox"
                  checked={criteria.excludedIndustries.includes(industry)}
                  onChange={() =>
                    onChange({
                      ...criteria,
                      excludedIndustries: toggleValue(criteria.excludedIndustries, industry),
                    })
                  }
                />
                <span>{industry}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="criteria-field criteria-number-group">
          <label htmlFor="earnings-basis">Minimum SDE / EBITDA</label>
          <p>Only compares like-for-like source labels.</p>
          <div className="inline-fields">
            <select
              id="earnings-basis"
              value={criteria.minimumEarnings.basis}
              onChange={(event) =>
                onChange({
                  ...criteria,
                  minimumEarnings: {
                    ...criteria.minimumEarnings,
                    basis: event.target.value as 'SDE' | 'EBITDA',
                  },
                })
              }
            >
              <option value="SDE">SDE</option>
              <option value="EBITDA">EBITDA</option>
            </select>
            <input
              aria-label="Minimum earnings amount"
              type="number"
              min="0"
              step="50000"
              value={criteria.minimumEarnings.amount}
              onChange={(event) =>
                onChange({
                  ...criteria,
                  minimumEarnings: {
                    ...criteria.minimumEarnings,
                    amount: Math.max(0, Number(event.target.value)),
                  },
                })
              }
            />
          </div>
          <span className="input-value">{formatMoney(criteria.minimumEarnings.amount)}</span>
        </div>

        <div className="criteria-field criteria-number-group">
          <label htmlFor="max-equity">Maximum equity check</label>
          <p>Routes oversized illustrative cases; it is not financing availability.</p>
          <input
            id="max-equity"
            type="number"
            min="0"
            step="50000"
            value={criteria.maximumEquityCheck}
            onChange={(event) =>
              onChange({ ...criteria, maximumEquityCheck: Math.max(0, Number(event.target.value)) })
            }
          />
          <span className="input-value">{formatMoney(criteria.maximumEquityCheck)}</span>
        </div>
      </div>
    </aside>
  )
}
