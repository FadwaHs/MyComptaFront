import { Client } from "./client"
import { Devis } from "./devis"
import { Facture } from "./facture"
import { FactureAcompte } from "./facture-acompte"
import { FactureAvoir } from "./facture-avoir"
import { FactureSimple } from "./facture-simple"
import { Opportunite } from "./opportunite"
import { Fournisseur } from "./fournisseur"
import { Societe } from "./societe"

export class MotCle{
    id ?: number
    mot : string
    societe : Societe
    client : Client
    fournisseur: Fournisseur // added this
    devis : Devis
    facture : Facture
    factureSimple : FactureSimple
    factureAvoir : FactureAvoir
    factureAcompte : FactureAcompte
    opportunite :Opportunite
}
