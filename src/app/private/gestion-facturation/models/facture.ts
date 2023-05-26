import { ConditionReglement } from "./condition-reglement"
import { Interet } from "./interet"
import { ModeReglement } from "./mode-reglement"
import { MotCle } from "./mot-cle"
import { Opportunite } from "./opportunite"

export class Facture{

    id: number
    slug: string
    code: string
    devise: string
    textIntro: string
    textCond: string
    piedPage: string
    condVente: string
    date: Date
    totalTTC: number
    totalHT : number
    motCleList: MotCle[]
    date_finalisation:Date

    //++
    conditionReglement: ConditionReglement|null
    modeReglement : ModeReglement|null
    interet : Interet|null
    opportunite :Opportunite |null

}

