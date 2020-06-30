import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, Inject, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appSticky]',
})
export class StickyDirective implements OnInit {

  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly renderer: Renderer2,
    private readonly el: ElementRef,
  ) { }

  public ngOnInit(): void {
    if (this.el !== undefined) {
      const height = this.document.querySelector('app-toolbar > .mat-toolbar.mat-primary')?.clientHeight;
      this.renderer.addClass(this.el.nativeElement, 'sticky');
      this.renderer.setStyle(this.el.nativeElement, 'transform', `translateY(${height}px)`);
    }
  }
}
