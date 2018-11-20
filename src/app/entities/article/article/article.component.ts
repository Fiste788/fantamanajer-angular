import { Component, OnInit } from '@angular/core';
import { routerTransition } from 'app/shared/animations/router-transition.animation';

@Component({
  selector: 'fm-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  animations: [routerTransition]
})
export class ArticleComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  getState(outlet) {
    // Changing the activatedRouteData.state triggers the animation
    return outlet.activatedRouteData.state;
  }

}
