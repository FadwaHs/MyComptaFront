import { ClientType } from "../enums/client-type"
import { Address } from "./address"
import { CompteTiers } from "./compte_tiers"
import { MotCle } from "./mot-cle"
import { Phone } from "./phone"
import { Social } from "./social"
import { Societe } from "./societe"

export class Client {

  id: number
  slug: string
  firstName : string
  lastName : string
  email: string
  function: string
  website? : string
  language : string
  note : string
  societe? : Societe
  motCleList : MotCle[]
  phoneList : Phone[]
  address : Address

  //++
  prospect :boolean
  clientType: ClientType
  socialList :Social[]
  compteTiers :CompteTiers
}
