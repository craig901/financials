import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable( {
  providedIn: 'root'
} )
export class LoaderService {

  /**
   * Constructor
   */
  constructor() {
  }

  /**
   * Is loading behaviour suject
   */
  isLoading = new BehaviorSubject<boolean>( false );

  /**
   * Show loader
   */
  show() {
    this.isLoading.next( true );
  }

  /**
   * Hide loader
   */
  hide() {
    this.isLoading.next( false );
  }

}
