import { FactureSimpleStatus } from "../enums/facture-simple-status";
import { Article } from "./article";
import { Client } from "./client";
import { Debours } from "./debours";
import { Facture } from "./facture";
import { Societe } from "./societe";

export class FactureSimple extends Facture{
  remise : number
  remIsPercentage : boolean
  status : FactureSimpleStatus
  societe : Societe | null
  client : Client | null
  articleList : Article[]
  debours : Debours[]
  date_paiement :Date
}
