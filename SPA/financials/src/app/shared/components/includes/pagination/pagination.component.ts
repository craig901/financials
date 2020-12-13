import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import {PaginationService} from "../../../services/app/pagination.service";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() items: Array<any>;
  @Input() page = 1;
  @Input() totalItems: number;
  @Input() itemsPerPage: number = 10;
  @Output() changePage = new EventEmitter<any>(true);
  @Input() initialPage = 1;
  @Input() pageSize = 10;
  @Input() maxPages = 10;

  pager: any = {};

  constructor(
    private service: PaginationService
  ) { }

  ngOnInit(): void {

    this.service.currentPage.subscribe(
      page => {
        this.setPage( page, false );
      }
    );

    this.service.currentTotal.subscribe(
      totalItems => {
        if( this.totalItems != totalItems )
        {
          this.totalItems = totalItems;
          this.setPage( 1, false );
        }
      }
    );

    // set page if items array inst't empty
    if( this.totalItems )
    {
      //this.setPage( this.initialPage );
      this.pager = this.paginate( this.totalItems, this.initialPage, this.itemsPerPage, this.maxPages );
    }
  }

  private setPage( page: number, emit: boolean = true )
  {
    // get new pager object for specified page
    this.pager = this.paginate( this.totalItems, page, this.itemsPerPage, this.maxPages );

    // get the new page of items from items array
    //const pageOfItems = this.items.slice( this.pager.startIndex, this.pager.endIndex );

    if( emit )
    {
      // call change page function in parent component
      this.changePage.emit( this.pager.currentPage );
    }
  }

  private paginate( totalItems: number, currentPage: number = 1, pageSize: number = 10, maxPages: number = 10 )
  {
    // Calculate total pages
    let totalPages = Math.ceil( totalItems / pageSize );

    // ensure current page isn't out of range
    if( currentPage < 1 ) {
      currentPage = 1;
    } else if ( currentPage > totalPages ) {
      currentPage = totalPages;
    }

    let startPage: number, endPage: number;
    if( totalPages <= maxPages )
    {
      startPage = 1;
      endPage = totalPages;
    } else {
      // total pages more than max so calculated start end pages
      let maxPagesBeforeCurrentPage = Math.floor( maxPages / 2 );
      let maxPagesAfterCurrentPage = Math.ceil( maxPages / 2 ) - 1;
      if( currentPage <= maxPagesBeforeCurrentPage ) {
        startPage = 1;
        endPage = maxPages;
      } else if ( currentPage + maxPagesBeforeCurrentPage >= totalPages ) {
        // current page near the end
        startPage = totalPages - maxPages + 1;
        endPage = totalPages;
      } else {
        // current page somewhere in the middle
        startPage = currentPage - maxPagesBeforeCurrentPage;
        endPage = currentPage + maxPagesAfterCurrentPage;
      }
    }

    // calculate start and end item indexes
    let startIndex = ( currentPage - 1 ) * pageSize;
    let endIndex = Math.min( startIndex + pageSize - 1, totalItems - 1 );

    // create an array of pages to ng-repeat in pager control
    let pages = Array.from( Array(( endPage + 1 ) - startPage ).keys()).map( i => startPage + i);

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }

}
