import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ITransactionFilters} from "../../../../shared/models/viewModels/ITransactionFilters";
import {ISort} from "../../../../shared/models/viewModels/ISort";

@Component({
  selector: 'app-sort-by',
  templateUrl: './sort-by.component.html',
  styleUrls: ['./sort-by.component.scss']
})
export class SortByComponent implements OnInit {

  @Input() model: ITransactionFilters;
  @Output() sortApplied: EventEmitter<ISort> = new EventEmitter<ISort>();
  label: string[];
  sortByOpen: boolean;

  constructor() { }

  ngOnInit(): void {
    this.applySelected();
  }

  applySelected()
  {
    this.label = this.model.sortOptions
      .filter( option => option.selected )
      .map( option => option.label );
  }

  applySort( sort: ISort )
  {
    this.model.sortOptions.forEach(function( option )
    {
      option.selected = false;
    });

    sort.selected = true;
    this.applySelected();
    this.sortApplied.emit( sort );
    this.toggleFilters();
  }

  toggleFilters() {
    this.sortByOpen = !this.sortByOpen;
  }

}
