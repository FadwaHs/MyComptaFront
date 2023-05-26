import { Opportunite } from "./opportunite"
import { Pipeline } from "./pipeline"

export class Etape{

  id: number
  etapename :string
  probabilite : number
  pipeline :Pipeline
  opportunite : Opportunite[]
}
