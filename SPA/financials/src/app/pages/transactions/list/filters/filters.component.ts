import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ITransactionFilters} from "../../../../shared/models/viewModels/ITransactionFilters";
import {IFilter} from "../../../../shared/models/viewModels/IFilter";

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  @Input() model: ITransactionFilters;
  @Output() filtersApplied: EventEmitter<ITransactionFilters> = new EventEmitter<ITransactionFilters>();
  filtersOpen: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  toggleFilter( filter: IFilter, emit: boolean = false )
  {
    filter.selected = !filter.selected;
    if( emit )
      this.filtersApplied.emit( this.model );
  }

  applyFilters() {
    this.closeFilters();
    this.filtersApplied.emit( this.model );
  }

  openFilters() {
    this.filtersOpen = true;
  }

  closeFilters() {
    this.filtersOpen = false;
  }

}
