import { FactureAvoirStatus } from "../enums/facture-avoir-status"
import { Article } from "./article"
import { Client } from "./client"
import { Debours } from "./debours"
import { Facture } from "./facture"
import { Societe } from "./societe"

export class FactureAvoir extends Facture{
  remise : number
  remIsPercentage : boolean
  status : FactureAvoirStatus
  societe : Societe | null
  client : Client | null
  articleList : Article[]
  debours : Debours[]
  valid: boolean

  date_remboursement:Date


}
