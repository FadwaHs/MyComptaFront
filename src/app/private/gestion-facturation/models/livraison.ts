import { Address } from "./address"
import { BonsCommande } from "./bons-commande"

export class Livraison {

  id :number
  nombreColis :number
  poidsTotal : number
  volume :number
  numeroSuivi :string
  urlSuivi:string
  adresseLivraison:Address
  bonsCommande :BonsCommande
}
