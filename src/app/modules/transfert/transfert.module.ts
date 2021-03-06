import { NgModule } from '@angular/core';

import { SelectionModule } from '@modules/selection/selection.module';
import { SharedModule } from '@shared/shared.module';

import { TransfertRoutingModule } from './transfert-routing.module';

@NgModule({
  declarations: [TransfertRoutingModule.components],
  imports: [SharedModule, TransfertRoutingModule, SelectionModule],
})
export class TransfertModule {}
