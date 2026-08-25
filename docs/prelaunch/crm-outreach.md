# CRM schema and draft-only outreach

## Source-of-truth boundary

The local contract is canonical for the pre-launch demo. Airtable, Google Sheets, and other persistence tools remain possible future adapters; they must mirror the local schema rather than redefine stage meanings or evidence states.

Minimum workflow record:

```ts
interface DealWorkflow {
  opportunityId: string
  pipelineType: 'on_market' | 'proprietary'
  stage: 'new_lead' | 'enrich' | 'partner_review' | 'approved_for_outreach'
    | 'contacted' | 'engaged' | 'nda_diligence' | 'hold' | 'declined'
  approvalStatus: 'not_requested' | 'pending' | 'approved' | 'rejected' | 'expired'
  nextAction: string
  nextActionOwner: string
  nextActionDueAt: string | null
  lastMeaningfulActivityAt: string | null
}
```

Minimum activity record:

```ts
interface Activity {
  activityId: string
  opportunityId: string
  activityType: 'source_observed' | 'evidence_added' | 'decision' | 'draft_prepared'
    | 'approval_recorded' | 'message_sent' | 'reply_received' | 'diligence_authorized'
  direction: 'internal' | 'inbound' | 'outbound'
  occurredAt: string
  approvalId: string | null
  externalMutation: boolean
}
```

## Send invariant

`contacted` may exist only after a future confirmed `message_sent` activity has `direction: 'outbound'`, a non-null timestamp, the matching approval ID, and `externalMutation: true`. An approved draft is not a send. An email open is not substantive engagement.

## Included templates

The canonical templates live in [`contracts/prelaunch-os.json`](../../contracts/prelaunch-os.json) and render in the Readiness workspace:

1. broker/intermediary first question;
2. proprietary-owner exploratory note; and
3. one bounded follow-up.

All use synthetic placeholders, `draftOnly: true`, and `sentAt: null`. There is no contact list, approval record, connector, send queue, or send button.

## Approval gate

Any future external communication requires Miles to approve the exact recipient or bounded audience, identity, channel, template, claims, suppression rules, and send scope. Professional review is required where securities, broker-dealer, privacy, employment, licensing, or other regulated activity may be implicated.

