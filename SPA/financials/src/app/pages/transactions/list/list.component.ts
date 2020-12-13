import { Component, OnInit } from '@angular/core';
import {TransactionService} from "../../../shared/services/api/transaction.service";
import {BehaviorSubject, Observable, Subject, merge} from "rxjs";
import {
  tap,
  map,
  startWith,
  mergeMap
} from "rxjs/operators";
import {IList} from "../../../shared/models/viewModels/IList";
import {ITransaction} from "../../../shared/models/entities/ITransaction";
import {ITransactionFilters} from "../../../shared/models/viewModels/ITransactionFilters";
import {PaginationService} from "../../../shared/services/app/pagination.service";
import {TransactionFiltersRequest} from "../../../shared/models/requests/TransactionFiltersRequest";
import {ISort} from "../../../shared/models/viewModels/ISort";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  page: number = 1;
  filters: TransactionFiltersRequest;

  private filterStream = new Subject<any>();
  private sortStream = new Subject<any>()
  private pageStream = new Subject<number>();

  model$: Observable<IList<ITransaction>>;
  filterOptions: ITransactionFilters;

  currentPageModel: number = 1;
  getOptions: boolean = true;
  sort: ISort;

  constructor(
    private service: TransactionService,
    private pagination: PaginationService
  ) { }

  ngOnInit(): void {

    this.pagination.changePage( 1 );

    const stream = merge(
      this.pageStream.pipe(
        map( pageNumber => {
          this.page = pageNumber;
        })
      ),
      this.filterStream.pipe(
        map(
          filters => {
            this.pagination.changePage( 1 );
          }
        )
      ),
      this.sortStream.pipe(
        map(
          sort => {
            this.sort = sort;
            this.pagination.changePage( 1 );
          }
        )
      )
    );

    this.model$ = stream.pipe(
      startWith({filters:this.filters,page:1}),
      mergeMap((params: {filters: any, page: number}) => {
        return this.service.getItems( this.page, this.filters, this.sort ).pipe(
          tap(
            response => {
              this.pagination.changeTotal( response.total )
            }
          )
        )
      })
    );

    this.service.getFilters().subscribe(
      res => {
        this.filterOptions = res;
      }
    );
  }

  pageChanged( page: number ): void {
    this.pageStream.next( page );
  }

  applyFilters( filters: ITransactionFilters ) {
    this.filters = new TransactionFiltersRequest( filters );
    this.page = 1;
    this.filterStream.next( this.filters );
  }

  applySort( sort: ISort ) {
    this.page = 1;
    this.sortStream.next( sort );
  }
}
