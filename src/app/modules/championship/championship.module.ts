import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { StreamModule } from '@app/modules/stream/stream.module';
import { SharedModule } from '../../shared/shared.module';
import { ChampionshipRoutingModule } from './championship-routing.module';
import { ChampionshipStreamComponent } from './pages/championship-stream/championship-stream.component';
import { ChampionshipResolver } from './pages/championship/championship-resolve.service';
import { ChampionshipComponent } from './pages/championship/championship.component';

@NgModule({
  declarations: [
    ChampionshipComponent,
    ChampionshipStreamComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ChampionshipRoutingModule,
    StreamModule
  ],
  providers: [
    ChampionshipResolver
  ]
})
export class ChampionshipModule { }
