import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { BCStatus } from 'src/app/private/gestion-facturation/enums/BCStatus';
import { BLStatus } from 'src/app/private/gestion-facturation/enums/BLStatus';
import { OppStatus } from 'src/app/private/gestion-facturation/enums/OppStatus';
import { AvoireFournisseurStatus } from 'src/app/private/gestion-facturation/enums/avoire-fournisseur-status';
import { DevisStatus } from 'src/app/private/gestion-facturation/enums/devis-status';
import { FactureAcompteStatus } from 'src/app/private/gestion-facturation/enums/facture-acompte-status';
import { FactureAvoirStatus } from 'src/app/private/gestion-facturation/enums/facture-avoir-status';
import { FactureSimpleStatus } from 'src/app/private/gestion-facturation/enums/facture-simple-status';
import { SimpleFournisseurStatus } from 'src/app/private/gestion-facturation/enums/simple-fournisseur-status';
import { BonLivraison } from 'src/app/private/gestion-facturation/models/bons-livraison';


@Injectable({
  providedIn: 'root'
})
  export class FilterService {

    private callMethodSearchSource = new Subject<any>();
    private callMethodFilterStatusSource = new Subject<any>();
    // Observable string streams
    methodSearchCalled$ = this.callMethodSearchSource.asObservable();
    methodFilterStatusCalled$ = this.callMethodFilterStatusSource.asObservable();

    // Service message commands
    callMethodSearch(data : string) {
      this.callMethodSearchSource.next(data);
    }


    callMethodFilterStatus(filterStatus : DevisStatus  | FactureSimpleStatus |FactureAvoirStatus|FactureAcompteStatus
      |SimpleFournisseurStatus|AvoireFournisseurStatus | OppStatus| BLStatus| BCStatus|null ){

      this.callMethodFilterStatusSource.next(filterStatus);
    }

  // for filter status opportunite !

  // create BehaviorSubject:  is a type of observable that allows the observer to receive the last emitted value, even if they subscribe after the value was emitted
  // oppStatusFilterSubject:  This is used to store the currently selected OppStatus filter value.
  // Every observer on subscribe gets current value.
   //Current value is either latest value emitted by source observable using next() method or initial/default value.
  private oppStatusFilterSubject: BehaviorSubject<OppStatus | null> = new BehaviorSubject<OppStatus | null>(null);

  setOppStatusFilter(status: OppStatus | null): void {

      /*  whenever the setOppStatusFilter method is called with a new value for status,
          it emits this new value to all subscribers of oppStatusFilterSubject.
          In your code, the subscribers are the components that are interested in filtering data
          based on the value of OppStatus.*/
    this.oppStatusFilterSubject.next(status);
  }

  /* A method to retrieve the current value of oppStatusFilterSubject.
  It returns the BehaviorSubject with the OppStatus filter value */
  getOppStatusFilter(): BehaviorSubject<OppStatus | null> {

    return this.oppStatusFilterSubject;
  }



  // create the BehaviorSubject
  private selectedItemSubject: BehaviorSubject<string | null > = new BehaviorSubject<string | null> (null);

  setselectedItemSubject(date: string | null  ): void {

      console.log(date,'date');
      this.selectedItemSubject.next(date);
  }

  getselectedItemSubject(): BehaviorSubject<string | null > {

       return this.selectedItemSubject;
  }





}


