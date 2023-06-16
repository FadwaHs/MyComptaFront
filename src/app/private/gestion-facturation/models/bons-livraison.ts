import { BLStatus } from "../enums/BLStatus";
import { Article } from "./article";
import { Bons } from "./bons";
import { Fournisseur } from "./fournisseur";
import { MotCle } from "./mot-cle";

export class BonLivraison  extends Bons{

   blStatus : BLStatus
   articleList : Article[]
   motCleList: MotCle[]
   remise : number
   remIsPercentage : boolean

   fournisseur : Fournisseur | null


}
