import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';

import { LayoutModule } from '@app/layout/layout.module';
import { MainComponent } from '@app/layout/main/main.component';
import { environment } from '@env';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  bootstrap: [MainComponent],
  imports: [
    // angular
    BrowserModule,
    BrowserAnimationsModule,

    // 3rd party
    LayoutModule,

    // core & shared
    CoreModule,
    SharedModule,

    // app
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AppRoutingModule,
  ],
})
export class AppModule { }
