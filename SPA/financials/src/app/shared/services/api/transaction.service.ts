import { Injectable } from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import { Observable } from "rxjs";
import {environment} from "../../../../environments/environment";
import {IList} from "../../models/viewModels/IList";
import {ITransaction} from "../../models/entities/ITransaction";
import {ITransactionFilters} from "../../models/viewModels/ITransactionFilters";
import {TransactionFiltersRequest} from "../../models/requests/TransactionFiltersRequest";
import {ISort} from "../../models/viewModels/ISort";
import {ISubmitTransaction} from "../../models/viewModels/ISubmitTransaction";
import {IDashboard} from "../../models/viewModels/IDashboard";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  /**
   * Constructor
   * @param http
   */
  constructor(
    private http: HttpClient
  ) {
  }

  /**
   * Get the dashboard method
   */
  getDashboard() {
    return this.http.get<IDashboard>( `${environment.apiUrl}/dashboard`, {} );
  }

  /**
   * Get all transaction items
   * @param page
   * @param filters
   * @param sort
   */
  getItems( page: number, filters?: TransactionFiltersRequest, sort?: ISort ): Observable<IList<ITransaction>> {
    let params = new HttpParams()
      .set('page', page.toString());
    if( filters )
      params = params.append('filters', JSON.stringify( filters ) );
    if( sort )
      params = params.append( 'sort', JSON.stringify( sort ) );

    return this.http.get<IList<ITransaction>>( `${environment.apiUrl}/transactions`, { params } );
  }

  /**
   * Get the filters
   */
  getFilters(): Observable<ITransactionFilters>
  {
    return this.http.get<ITransactionFilters>( `${environment.apiUrl}/transactions/filters` );
  }

  /**
   * Get the submit page
   */
  getSubmit(): Observable<ISubmitTransaction>
  {
    return this.http.get<ISubmitTransaction>( `${environment.apiUrl}/transactions/submit` );
  }

  /**
   * Post a transaction
   * @param request
   */
  postSubmit( request ) {
    return this.http.post<any>( `${environment.apiUrl}/transactions/submit`, { request } );
  }
}
