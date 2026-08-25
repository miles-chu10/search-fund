import prelaunchJson from '../../contracts/prelaunch-os.json'
import { prelaunchContractSchema } from '../domain/prelaunch'

export const prelaunch = prelaunchContractSchema.parse(prelaunchJson)

