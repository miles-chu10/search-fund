# Diligence checklist and data-room index

The index organizes requests and review. It is not a secure data room, quality-of-earnings report, legal diligence conclusion, tax analysis, or authorization to access gated material.

## Folder index

| Folder | Evidence requested |
|---|---|
| `00-index` | Request log, document index, permissions, owners, and review status |
| `01-corporate-ownership` | Formation, capitalization, governance, subsidiaries, and ownership evidence |
| `02-financial` | Statements, ledgers, debt, capex, working capital, and qualified QoE/accounting work |
| `03-commercial` | Revenue, contracts, pricing, pipeline, retention/churn, cohorts, and concentration |
| `04-operations` | Owner role, org chart, SOPs, KPIs, facilities, equipment, and inventory |
| `05-people-benefits` | Employees, contractors, compensation, benefits, turnover, classification, and disputes |
| `06-legal-regulatory` | Contracts, licenses, permits, IP, litigation, compliance, privacy, and security obligations |
| `07-tax` | Returns, notices, audits, payroll, sales tax, nexus, and transaction-structure review |
| `08-insurance-risk` | Policies, claims, loss runs, safety, and environmental materials |
| `09-technology-security` | Systems, vendors, access architecture, incidents, continuity, and data practices |
| `10-transaction-financing` | Sources/uses, debt indications, seller terms, working-capital peg, and conditions |
| `11-transition-100-day` | Seller handoffs, introductions, manager plan, Day 1, and 100-day plan |

## Metadata record

Store only:

```text
documentId, opportunityId, folder, title, documentDate, receivedAt,
sourceParty, confidentiality, version, approvedStoragePointer, sha256, reviewStatus
```

Do not store raw tax returns, bank statements, credentials, recovery material, background reports, PII, customer lists, employee records, or NDA-gated seller files in git. Use an approved secure system and store only a privacy-safe pointer/hash here.

## Diligence gates

- **Triage:** canonical source, identity, date, and critical unknowns.
- **Pre-NDA:** public evidence only; no seller claim becomes verified by repetition.
- **Authorized diligence:** executed NDA and approved access before receiving gated material.
- **Professional review:** legal, tax, accounting/QoE, insurance, security/privacy, and financing specialists own conclusions in their domains.
- **Transaction:** no model score or checklist completion substitutes for a separate go/no-go decision.

