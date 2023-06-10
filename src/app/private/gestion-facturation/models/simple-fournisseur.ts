import { LivraisonStatus } from "../enums/livraison-status";
import { SimpleFournisseurStatus } from "../enums/simple-fournisseur-status";
import { Article } from "./article";
import { FactureFournisseur } from "./facture-fournisseur";

export class SimpleFournisseur extends FactureFournisseur{

  status : SimpleFournisseurStatus
  livraisonStatus :LivraisonStatus
  articleList : Article[]
}
