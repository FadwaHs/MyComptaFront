import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'platform'
})
export class NavigateService {

  public readonly addPath = '/add'
  public readonly editPath = '/edit/'
  public readonly showPath = '/show/'
  public readonly environmentListPath = '/environments'
  public readonly environmentPath = '/environment/1'
  public readonly personnelPath = this.environmentPath+'/personnel'

  public readonly departementsPath = this.personnelPath+'/departements'


  public readonly facturationPath = this.environmentPath+'/facturation'
  public readonly dashboardPath= this.facturationPath+'/dashboard'

  // Start of routes of Espace Facturation
  public readonly f_societePath = this.facturationPath+'/societes'
  public readonly f_clientPath = this.facturationPath+'/clients'
  public readonly f_devisPath = this.facturationPath+'/devis'

  public readonly f_opportunitePath = this.facturationPath+'/opportunites'
  public readonly PipePath = this.facturationPath+'/pipeline'


  public readonly f_fournisseurPath = this.facturationPath+'/fournisseurs'
  public readonly f_factureFournisseurPath = this.facturationPath+'/factures-fournisseur'
  public readonly f_simpleFournisseurPath = this.f_factureFournisseurPath+'/simple'
  public readonly f_avoirFournisseurPath = this.f_factureFournisseurPath+'/avoir'



  public readonly f_facturePath = this.facturationPath+'/factures'
  public readonly f_simplePath = this.f_facturePath+'/simple'
  public readonly f_avoirPath = this.f_facturePath+'/avoir'
  public readonly f_acomptePath = this.f_facturePath+'/acompte'

  public readonly f_settingsPath = this.facturationPath+'/settings'
  public readonly f_s_itemTypesPath = this.f_settingsPath+'/item-types'
  public readonly f_s_preferencesPath = this.f_settingsPath+'/preferences'
  public readonly f_s_generalPath = this.f_s_preferencesPath+'/general'
  public readonly f_s_uidsPath = this.f_s_preferencesPath+'/uids'
  // End of routes of Espace Facturation
  public readonly f_bonsPath = this.facturationPath+'/bons'
  public readonly f_livraisonPath = this.f_bonsPath+'/livraison'
  public readonly f_commandePath = this.f_bonsPath+'/commande'

  //pdf
  public readonly f_pdfPath = this.facturationPath+'/pdf'
  public readonly devisPath = '/devis/'
  public readonly factSimpPath = '/facture-simple/'
  public readonly avoirPath = '/avoir/'
  public readonly acomptePath = '/acompte/'





  constructor(){ }


  toAddPath(from : 'C'|'S'|'D'|'F'|'A'|'FA'|'O'|'FR'|'SF'|'AF'|'BL'|'BC') : string {

    if(from == 'C') return this.f_clientPath+this.addPath

    else if(from == 'S') return this.f_societePath+this.addPath

    else if(from == 'D') return this.f_devisPath+this.addPath

    else if(from == 'F') return this.f_simplePath+this.addPath

    else if(from == 'A') return this.f_avoirPath+this.addPath

    else if(from == 'FA') return this.f_acomptePath+this.addPath

    else if(from == 'O') return this.f_opportunitePath+this.addPath

    else if(from == 'FR') return this.f_fournisseurPath+this.addPath

    else if(from == 'SF') return this.f_simpleFournisseurPath+this.addPath

    else if(from == 'AF') return this.f_avoirFournisseurPath+this.addPath

    else if(from == 'BL') return this.f_livraisonPath+this.addPath

    else if(from == 'BC') return this.f_commandePath+this.addPath



    else return ''
  }


  toEditPath(from : 'C'|'S'|'D'|'F'|'A'|'FA'|'O'|'P'|'FR'|'SF'|'AF' |'BL'|'BC', id : number ,slug : string) : string {


    if(from == 'C') return this.f_clientPath+this.editPath+id+'-'+slug

    else if(from == 'FR') return this.f_fournisseurPath+this.editPath+id+'-'+slug

    else if(from == 'S') return this.f_societePath+this.editPath+id+'-'+slug

    else if(from == 'D') return this.f_devisPath+this.editPath+id+'-'+slug

    else if(from == 'F') return this.f_simplePath+this.editPath+id+'-'+slug

    else if(from == 'A') return this.f_acomptePath+this.editPath+id+'-'+slug

    else if(from == 'FA') return this.f_avoirPath+this.editPath+id+'-'+slug

    else if(from == 'O') return this.f_opportunitePath+this.editPath+id+'-'+slug

    else if(from == 'P') return this.PipePath+this.editPath+id+'-'+slug


    else if(from == 'SF') return this.f_simpleFournisseurPath+this.editPath+id+'-'+slug

    else if(from == 'AF') return this.f_avoirFournisseurPath+this.editPath+id+'-'+slug

    else if(from == 'BL') return this.f_livraisonPath+this.editPath+id+'-'+slug

    else if(from == 'BC') return this.f_commandePath+this.editPath+id+'-'+slug



    else return ''
  }



   toShowPath(from : 'C'|'S'|'D'|'F'|'A'|'FA'|'O'|'P'|'FR'|'SF'|'AF'|'BL'|'BC', id : number ,slug : string) : string {


    if(from == 'C')  return this.f_clientPath+this.showPath+id+'-'+slug

    else if(from == 'FR') return this.f_fournisseurPath+this.showPath+id+'-'+slug

    else if(from == 'S') return this.f_societePath+this.showPath+id+'-'+slug

    else if(from == 'D') return this.f_devisPath+this.showPath+id+'-'+slug

    else if(from == 'F') return this.f_simplePath+this.showPath+id+'-'+slug

    else if(from == 'FA') return this.f_acomptePath+this.showPath+id+'-'+slug

    else if(from == 'A') return this.f_avoirPath+this.showPath+id+'-'+slug

    else if(from == 'O') return this.f_opportunitePath+this.showPath+id+'-'+slug

    else if(from == 'P') return this.PipePath+this.showPath+id+'-'+slug


    else if(from == 'SF') return this.f_simpleFournisseurPath+this.showPath+id+'-'+slug

    else if(from == 'AF') return this.f_avoirFournisseurPath+this.showPath+id+'-'+slug

    else if(from == 'BL') return this.f_livraisonPath+this.showPath+id+'-'+slug

    else if(from == 'BC') return this.f_commandePath+this.showPath+id+'-'+slug



    else return ''
  }

  toPdfPath(from :'D'|'F'|'A'|'FA', id : number ,slug : string) : string {
    if(from == 'D')
       return this.f_pdfPath+this.devisPath+id+'-'+slug
    else if(from == 'F')
       return this.f_pdfPath+this.factSimpPath+id+'-'+slug
    else if(from == 'A')
       return this.f_pdfPath+this.avoirPath+id+'-'+slug
       else if(from == 'FA')
       return this.f_pdfPath+this.acomptePath+id+'-'+slug
   else return ''
  }

}
