import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ChampionshipDetailComponent } from './pages/championship-detail/championship-detail.component';
import { AddTeamComponent } from './pages/add-team/add-team.component';
import { RouterOutletComponent } from '@app/shared/components/router-outlet/router-outlet.component';

const routes: Routes = [
  {
    path: '',
    component: RouterOutletComponent,
    children: [
      { path: '', redirectTo: 'index', pathMatch: 'full', data: { state: 'admin-championship-outlet' } },
      { path: 'index', component: HomeComponent, data: { state: 'admin-championship-home' } },
      { path: 'add-team', component: AddTeamComponent, data: { state: 'admin-add-team' } },
      { path: 'edit', component: ChampionshipDetailComponent, data: { state: 'admin-edit' } },
      {
        path: 'new',
        component: ChampionshipDetailComponent,
        data: {
          breadcrumbs: 'Nuovo lega',
          data: { state: 'admin-championship-detail' }
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminChampionshipRoutingModule { }
