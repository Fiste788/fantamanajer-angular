import { Component, OnInit } from '@angular/core';
import { routerTransition } from '@app/core/animations/router-transition.animation';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'fm-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  animations: [routerTransition]
})
export class ArticleComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  getState(outlet: RouterOutlet) {
    // Changing the activatedRouteData.state triggers the animation
    return outlet.activatedRouteData.state;
  }

}
