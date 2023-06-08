import { Client } from "./client";
import { Fournisseur } from "./fournisseur";

import { Societe } from "./societe";




export class Social{
  id: number;
  name: string;
  link: string;
  client :Client |null
  societe :Societe |null
  fournisseur : Fournisseur |null

}
