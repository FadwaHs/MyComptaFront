import { Address } from "./address"
import { Client } from "./client"
import { MotCle } from "./mot-cle"
import { Phone } from "./phone"

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
}
