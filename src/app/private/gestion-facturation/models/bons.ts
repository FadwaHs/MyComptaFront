import { Article } from "./article"
import { Fournisseur } from "./fournisseur"
import { MotCle } from "./mot-cle"

export class Bons{

  id: number
  slug: string
  numero_interne: string
  numero_externe:string
  devise: string
  note: string
  totalTTC: number
  totalHT : number
  date_creation: Date


}
