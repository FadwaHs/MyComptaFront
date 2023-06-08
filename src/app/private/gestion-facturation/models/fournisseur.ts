import { Address } from "./address"
import { CompteCharge } from "./compte_charge";
import { CompteTiers } from "./compte_tiers";
import { Phone } from "./phone";
import { Social } from "./social";
import { Societe } from "./societe";


export class Fournisseur{

  id: number;
  slug: string;
  firstName: string;
  lastName: string;
  email: string;
  function: string;
  website?: string;
  note: string;
  reference: string;
  phoneList : Phone[];
  address : Address;
  societe? : Societe;
  compteCharge: CompteCharge;
  compteTiers: CompteTiers;
  socialList: Social[];

}
