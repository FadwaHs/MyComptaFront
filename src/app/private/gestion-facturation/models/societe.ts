import { ClientType } from "../enums/client-type"
import { Address } from "./address"
import { Client } from "./client"
import { MotCle } from "./mot-cle"
import { Phone } from "./phone"
import { Secteur } from "./secteur"
import { Social } from "./social"

export class Societe {

  id : number
  slug :string
  name : string
  ntva : string
  siren : string
  codeNaf : string
  website : string
  language : string
  clientList : Client[]
  phoneList : Phone[]
  motCleList : MotCle[]
  address : Address

  //++
  prospect :boolean
  societeType: ClientType
  socialList :Social[]
  secteur :Secteur
  note :string
}
