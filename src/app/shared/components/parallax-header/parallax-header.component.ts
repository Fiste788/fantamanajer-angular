import { Component, Input } from '@angular/core';
import { Tab } from '@app/core/models';
import { ScrollService } from '@app/core/services';

@Component({
  selector: 'fm-parallax-header',
  templateUrl: './parallax-header.component.html',
  styleUrls: ['./parallax-header.component.scss']
})
export class ParallaxHeaderComponent {
  @Input() title: string;
  @Input() subtitle: string;
  @Input() image: string;
  @Input() backgroundImage: any;
  @Input() tabs: Array<Tab> = [];
  srcset = '';
  width = 0;

  constructor(private readonly scrollService: ScrollService) {
  }

  initialScroll(event: Event): void {
    this.scrollService.scrollTo(0, (event.target as HTMLElement).clientHeight - 300);
  }

  track(_: number, item: Tab): string {
    return item.link;
  }
}
