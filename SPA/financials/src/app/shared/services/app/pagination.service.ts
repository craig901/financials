import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable( {
  providedIn: 'root'
} )
export class PaginationService {

  /**
   * Page source
   * @private
   */
  private pageSource = new BehaviorSubject( 1 );

  /**
   * Current page observable
   */
  currentPage = this.pageSource.asObservable();

  /**
   * Total source
   * @private
   */
  private totalSource = new BehaviorSubject( 1 );

  /**
   * Current total
   */
  currentTotal = this.totalSource.asObservable();

  /**
   * Reset source
   * @private
   */
  private resetSource = new BehaviorSubject( 1 );

  /**
   * Reset observable
   */
  reset$ = this.resetSource.asObservable();

  /**
   * Constructor
   */
  constructor() {}

  /**
   * Change the page
   * @param page
   */
  changePage( page:number ) {
    this.pageSource.next( page );
  }

  /**
   * Change the total
   * @param total
   */
  changeTotal( total: number ) {
    this.totalSource.next( total );
  }

  /**
   * Reset the total items
   * @param totalItems
   */
  reset( totalItems: number ) {
    this.resetSource.next( totalItems );
  }

}
