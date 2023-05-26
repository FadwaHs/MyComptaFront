import { Etape } from "./etape"
import { Opportunite } from "./opportunite"

export class Pipeline{

  id :number
  slug: string
  name :string
  etapeList :Etape[]
  //add
  opportunityCount: number
}
