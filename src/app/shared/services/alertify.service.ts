import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import * as alertify from 'alertifyjs';
import { ClientService } from 'src/app/private/gestion-facturation/http/client.service';
import { SocieteService } from 'src/app/private/gestion-facturation/http/societe.service';
import { Client } from 'src/app/private/gestion-facturation/models/client';
import { Devis } from 'src/app/private/gestion-facturation/models/devis';
import { Facture } from 'src/app/private/gestion-facturation/models/facture';
import { Societe } from 'src/app/private/gestion-facturation/models/societe';
import { NavigateService } from './navigate.service';


@Injectable({
  providedIn: 'root'
})
export class AlertifyService {
  constructor(
    private router : Router,
    private clientService : ClientService,
    private societeService : SocieteService,
    private navigate : NavigateService
  ) {

    alertify.defaults = {
      // dialogs defaults
      autoReset:true,
      basic:false,
      closable:true,
      closableByDimmer:true,
      invokeOnCloseOff:false,
      frameless:false,
      defaultFocusOff:false,
      maintainFocus:true, // <== global default not per instance, applies to all dialogs
      maximizable:true,
      modal:true,
      movable:true,
      moveBounded:false,
      overflow:true,
      padding: true,
      pinnable:true,
      pinned:true,
      preventBodyShift:false, // <== global default not per instance, applies to all dialogs
      resizable:true,
      startMaximized:false,
      transition:'pulse',
      transitionOff:false,
      tabbable:'button:not(:disabled):not(.ajs-reset),[href]:not(:disabled):not(.ajs-reset),input:not(:disabled):not(.ajs-reset),select:not(:disabled):not(.ajs-reset),textarea:not(:disabled):not(.ajs-reset),[tabindex]:not([tabindex^="-"]):not(:disabled):not(.ajs-reset)',  // <== global default not per instance, applies to all dialogs

      // notifier defaults
      notifier:{
      // auto-dismiss wait time (in seconds)
          delay:2,
      // default position
          position:'bottom-right',
      // adds a close button to notifier messages
          closeButton: false,
      // provides the ability to rename notifier classes
          classes : {
              base: 'alertify-notifier',
              prefix:'ajs-',
              message: 'ajs-message',
              top: 'ajs-top',
              right: 'ajs-right',
              bottom: 'ajs-bottom',
              left: 'ajs-left',
              center: 'ajs-center',
              visible: 'ajs-visible',
              hidden: 'ajs-hidden',
              close: 'ajs-close'
          }
      },

      // language resources
      glossary:{
          // dialogs default title
          title:'Delete',
          // ok button text
          ok: 'Delete',
          // cancel button text
          cancel: 'Cancel'
      },

      // theme settings
      theme:{
          // class name attached to prompt dialog input textbox.
          input:'ajs-input',
          // class name attached to ok button
          ok:'ajs-ok',
          // class name attached to cancel button
          cancel:'ajs-cancel'
      },
      // global hooks
      hooks:{
          // invoked before initializing any dialog
          preinit:function(instance:any){},
          // invoked after initializing any dialog
          postinit:function(instance:any){},
      },
  };
  }




  success(message: string) {
    alertify.success(message);
  }

  error(message: string) {
    alertify.error(message);
  }
  warning(message: string) {
    alertify.warning(message);
  }
  message(message: string) {
    alertify.message(message);
  }

  confirm(message: string) {
    alertify
      .confirm(
        message,
        () => {
          alertify.success('Accepted')
          // this.router.navigateByUrl('/clients')
        },
        () => {
          alertify.error('error')

        },
      )

  }

  deleteData( data : Societe|Client|Devis|Facture, type : 'C'|'S'|'D'|'F'){
    if(type == 'C'){
      var client : Client  = data as Client;
      var message = "Are you sure that you to delete this client "+client.firstName+' '+client.lastName+' ?'
      alertify.confirm(
        message,
        () => {
          this.deleteClient(client.id)
        }
      )
    }

    else if(type == 'S'){
      var societe : Societe  = data as Societe;
      var message = "Are you sure that you to delete this societe "+societe.name+' ?'
      alertify.confirm(
        message,
        () => {
          this.deleteSociete(societe.id)
        }
      )
    }
  }

   deleteClient(id :number){
    this.clientService.deleteClientById(id).subscribe({
      next : res => {
        this.success(res)
        this.router.routeReuseStrategy.shouldReuseRoute = () => {return false}
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigateByUrl(this.navigate.f_clientPath)
        },
      error : e => this.error(e),
    })
  }

  deleteSociete(id :number){

    this.societeService.deleteSocieteById(id).subscribe({
      next : res => {
        this.success(res)
        this.router.routeReuseStrategy.shouldReuseRoute = () => {return false}
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigateByUrl(this.navigate.f_societePath)
        },
      error : e => this.error(e),
    })
  }


}
