import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule, DEFAULT_BREAKPOINTS, BREAKPOINTS } from '@angular/flex-layout';
import { McBreadcrumbsModule } from 'ngx-breadcrumbs-ui';
import { LazyLoadImageModule, intersectionObserverPreset, LoadImageProps } from 'ng-lazyload-image';
import { SrcsetPipe, PlaceholderPipe, ClubDefaultImagePipe } from '@app/shared/pipes';
import { RellaxDirective, SrcsetDirective, StickyDirective } from '@app/shared/directives';
import { MaterialModule } from './material.module';
import { ParallaxHeaderComponent } from './components/parallax-header/parallax-header.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { MatEmptyStateComponent } from './components/mat-empty-state/mat-empty-state.component';
import { SharedService } from './services';
import { RouterOutletComponent } from './components/router-outlet/router-outlet.component';

export const breakPointsProvider = {
  provide: BREAKPOINTS,
  useValue: DEFAULT_BREAKPOINTS,
  multi: true
};

export async function loadImage({ imagePath }: LoadImageProps): Promise<string> {
  return await fetch(imagePath, {
    // mode: 'no-cors',
  }).then(res => res.blob()).then(blob => URL.createObjectURL(blob));
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MaterialModule,

    FlexLayoutModule,
    McBreadcrumbsModule,
    LazyLoadImageModule.forRoot({
      // loadImage,
      preset: intersectionObserverPreset
    })
  ],
  declarations: [
    RellaxDirective,
    SrcsetDirective,
    StickyDirective,
    SrcsetPipe,
    PlaceholderPipe,
    ClubDefaultImagePipe,
    ParallaxHeaderComponent,
    BreadcrumbComponent,
    MatEmptyStateComponent,
    RouterOutletComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MaterialModule,

    FlexLayoutModule,
    McBreadcrumbsModule,
    ParallaxHeaderComponent,
    BreadcrumbComponent,
    MatEmptyStateComponent,
    LazyLoadImageModule,
    PlaceholderPipe,
    SrcsetPipe,
    ClubDefaultImagePipe,
    RellaxDirective,
    StickyDirective,
    SrcsetDirective
  ],
  providers: [
    SharedService
  ]

})
export class SharedModule { }
