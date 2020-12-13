


import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  template: `<span class="text-danger" [hidden]="_hide">{{_text}}</span>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlErrorComponent implements OnInit {
  _text;
  _hide = true;

  @Input() set text(value) {
    if (value !== this._text) {
      this._text = value;
      this._hide = !value;
      this.cdr.detectChanges();
    }
  };

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    //console.log( 'ControlErrorComponent handles the error span' );
  }

}
