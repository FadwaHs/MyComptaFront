import { LivraisonStatus } from "../enums/livraison-status";
import { SimpleFournisseurStatus } from "../enums/simple-fournisseur-status";
import { Article } from "./article";
import { FactureFournisseur } from "./facture-fournisseur";
import { Fournisseur } from "./fournisseur";
import { MotCle } from "./mot-cle";
import { Paiement } from "./paiement";

export class SimpleFournisseur extends FactureFournisseur{

  status : SimpleFournisseurStatus
  livraisonStatus :LivraisonStatus
  remise :number
  remIsPercentage :boolean
  articleList : Article[]
  motCleList: MotCle[]
  fournisseur: Fournisseur
  //++
  paiement: Paiement[]

}
