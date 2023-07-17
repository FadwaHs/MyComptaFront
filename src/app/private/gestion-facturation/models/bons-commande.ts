import { Livraison } from './livraison';

import { LivraisonStatus } from 'src/app/private/gestion-facturation/enums/livraison-status';
import { BCStatus } from "../enums/BCStatus";
import { Bons } from "./bons";
import { Fournisseur } from './fournisseur';
import { ConditionReglement } from './condition-reglement';
import { ModeReglement } from './mode-reglement';
import { Article } from './article';
import { MotCle } from './mot-cle';

export class BonsCommande  extends Bons {
  remise : number
  remIsPercentage : boolean
  bcStatus :BCStatus
  livraisonStatusBc :LivraisonStatus
  date_Livraison :Date
  conditionReglement :ConditionReglement
  modeReglement:ModeReglement
  livraison:Livraison
  articleList : Article[]
  motCleList: MotCle[]
  fournisseur : Fournisseur | null
}
