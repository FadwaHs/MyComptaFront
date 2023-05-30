import { Client } from "./client";
import { Fournisseur } from "./fournisseur";
import { Societe } from "./societe";

export class Phone {
  id: number
  phoneNumber: string
  societe: Societe
  client : Client
  fournisseur: Fournisseur // added this
}
