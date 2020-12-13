import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-form-group',
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.scss']
})
export class FormGroupComponent implements OnInit {

  @Input() title: string;
  @Input() for: string;
  @Input() hasError: boolean;
  @Input() required: boolean;
  @Input() helpTextTitle: string;
  @Input() helpText: string;

  constructor() { }

  ngOnInit(): void {
  }

}
