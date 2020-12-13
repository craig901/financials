import {IFilter} from "./IFilter";
import {ISort} from "./ISort";

export interface ITransactionFilters {
  types: IFilter[];
  categories: IFilter[];
  tags: IFilter[];
  sortOptions: ISort[];
}

// export class TransactionFilters {
//
//   types: number[];
//   categories: number[];
//   tags: number[];
//
//   constructor( filters: ITransactionFilters ) {
//
//     this.types = filters.types
//       .filter( filter => filter.selected )
//       .map( filter => filter.id );
//
//     this.categories = filters.categories
//       .filter( filter => filter.selected )
//       .map( filter => filter.id );
//
//     this.tags = filters.tags
//       .filter( filter => filter.selected )
//       .map( filter => filter.id );
//   }
//
//   generate(): void {
//     console.log( this );
//   }
//
//
// }
