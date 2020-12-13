import {Component, Input, OnInit} from '@angular/core';
import {fadeAnimation} from "../../../animations/fade.animation";
import {fadeInAnimation} from "../../../animations/fadeIn.animation";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  animations: [
    fadeAnimation,
    fadeInAnimation
  ]
})
export class CardComponent implements OnInit {

  @Input() title;

  constructor() { }

  ngOnInit(): void {
  }

}
