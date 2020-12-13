import {ITransactionFilters} from "../viewModels/ITransactionFilters";

export class TransactionFiltersRequest
{
  types: number[];
  categories: number[];
  tags: number[];

  constructor( filters: ITransactionFilters )
  {
    this.types = filters.types
      .filter( filter => filter.selected )
      .map( filter => filter.id );

    this.categories = filters.categories
      .filter( filter => filter.selected )
      .map( filter => filter.id );

    this.tags = filters.tags
      .filter( filter => filter.selected )
      .map( filter => filter.id );
  }
}
