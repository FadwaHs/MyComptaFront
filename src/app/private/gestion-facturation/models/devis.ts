import { Client } from "./client"
import { Facture } from "./facture"
import { MotCle } from "./mot-cle"
import { Societe } from "./societe"
import { ConditionReglement } from "./condition-reglement"
import { ModeReglement } from "./mode-reglement"
import { Interet } from "./interet"
import { Article } from "./article"
import { DevisStatus } from "../enums/devis-status"

export class Devis{
    id: number
    slug: string
    code :string
    cmp :number
    validationDuration: number
    devise : string
    remise : number
    remIsPercentage : boolean
    textIntro :string
    textCond : string
    piedPage : string
    condVente : string
    totalHT : number
    totalTTC : number
    date : Date
    status : DevisStatus
    motCleList : MotCle[]
    societe : Societe | null
    client : Client | null

    conditionReglement: ConditionReglement
    modeReglement : ModeReglement
    interet : Interet
    articleList : Article[]
    // factureList : Facture[]

}
