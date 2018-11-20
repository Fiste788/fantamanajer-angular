import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayerComponent } from './player/player.component';
import { PlayerResolver } from './player/player-resolver.service';

const routes: Routes = [
  { path: '', component: PlayerComponent, data: { state: 'player' } },
  {
    path: ':id',
    component: PlayerComponent,
    resolve: {
      player: PlayerResolver,
    },
    data: {
      state: 'player-detail',
      breadcrumbs: '{{ player.name }} {{player.surname}}'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayerRoutingModule { }
