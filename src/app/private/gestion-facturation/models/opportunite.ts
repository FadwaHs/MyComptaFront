
import { OppStatus } from "../enums/OppStatus"
import { Client } from "./client"
import { MotCle } from "./mot-cle"
import { Societe } from "./societe"

export class Opportunite
{
  id: number
  slug: string
  code :string
  Intitule : string
  MantantHT:number
  devise : string
  datecreation : Date
  Probabilite : number
  Note : string
  oppStatus : OppStatus
  motCleList : MotCle[]
  societe : Societe | null
  client : Client | null

}
