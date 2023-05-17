import { MotCle } from "./mot-cle"

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
    
}

