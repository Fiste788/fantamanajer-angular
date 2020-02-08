import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { listItemAnimation } from '@app/core/animations/list-item.animation';
import { StreamService } from '@app/core/services/stream.service';
import { StreamDataSource } from './stream.datasource';

@Component({
  selector: 'fm-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.scss'],
  animations: [listItemAnimation]
})
export class StreamComponent implements OnInit, OnDestroy, AfterViewInit {
  ds: StreamDataSource;
  width: number;
  @Input() context: 'teams' | 'users' | 'clubs' | 'championships';
  @Input() id: number;
  @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;

  constructor(private readonly streamService: StreamService) { }

  ngOnInit(): void {
    this.ds = new StreamDataSource(this.streamService, this.context, this.id);
  }

  ngAfterViewInit(): void {
    this.width = this.viewport.elementRef.nativeElement.clientWidth;
  }

  ngOnDestroy(): void {
    this.ds.disconnect();
  }
}
