import opportunitiesJson from '../../data/opportunities.json'
import { opportunityListSchema } from '../domain/schema'

export const opportunities = opportunityListSchema.parse(opportunitiesJson)

export const industries = [...new Set(opportunities.map((opportunity) => opportunity.industry))].sort()
export const regions = [...new Set(opportunities.map((opportunity) => opportunity.location.region))].sort()
