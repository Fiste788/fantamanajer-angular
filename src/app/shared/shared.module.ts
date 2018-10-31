import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { McBreadcrumbsModule } from 'ngx-breadcrumbs-ui';
import { MaterialModule } from './material.module';
import { ParallaxHeaderComponent } from './parallax-header/parallax-header.component';
import { RellaxModule } from './rellax/rellax.module';
import { SrcsetDirective } from './srcset/srcset.directive';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { MatEmptyStateComponent } from './mat-empty-state/mat-empty-state.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    McBreadcrumbsModule,
    MaterialModule,
    RellaxModule
  ],
  exports: [
    FormsModule,
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule,
    McBreadcrumbsModule,
    ParallaxHeaderComponent,
    BreadcrumbComponent,
    RellaxModule,
    SrcsetDirective,
    MatEmptyStateComponent,
  ],
  declarations: [
    ParallaxHeaderComponent,
    BreadcrumbComponent,
    SrcsetDirective,
    MatEmptyStateComponent,
  ]
})
export class SharedModule { }
