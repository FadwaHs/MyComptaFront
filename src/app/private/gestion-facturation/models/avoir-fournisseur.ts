import { AvoireFournisseurStatus } from "../enums/avoire-fournisseur-status";
import { Article } from "./article";
import { FactureFournisseur } from "./facture-fournisseur";

export class AvoireFournisseur extends FactureFournisseur{


  status : AvoireFournisseurStatus
  articleList : Article[]

}
