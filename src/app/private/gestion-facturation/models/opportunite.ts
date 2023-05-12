
import { OppStatus } from "../enums/OppStatus"
import { Client } from "./client"
import { Devis } from "./devis"
import { Etape } from "./etape"
import { Facture } from "./facture"
import { MotCle } from "./mot-cle"
import { Pipeline } from "./pipeline"
import { Societe } from "./societe"

export class Opportunite
{
  id: number
  slug: string
  code :string
  intitule : string
  mantantHT:number
  devise : string
  source: string
  dateFin: Date
  datecreation : Date
  probabilite : number
  note : string
  oppStatus : OppStatus
  motCleList : MotCle[]
  societe : Societe | null
  client : Client | null
  etape: Etape
  devisList: Devis[]
  factureList : Facture[]


}



