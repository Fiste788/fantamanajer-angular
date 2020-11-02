import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminGuard } from '@app/guards';

import { ChampionshipStreamPage } from './pages/championship-stream/championship-stream.page';
import { ChampionshipResolver } from './pages/championship/championship-resolve.service';
import { ChampionshipPage } from './pages/championship/championship.page';

const routes: Routes = [
  {
    path: ':championship_id',
    component: ChampionshipPage,
    data: {
      // tslint:disable-next-line: no-invalid-template-strings
      breadcrumbs: '${championship.league.name}',
      state: 'championship',
    },
    resolve: {
      championship: ChampionshipResolver,
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'teams',
      },
      {
        path: 'articles',
        data: { state: 'articles' },
        loadChildren: () => import('@modules/article/article.module')
          .then(m => m.ArticleModule),
      },
      {
        path: 'teams',
        data: { state: 'teams' },
        loadChildren: () => import('@modules/team/team.module')
          .then(m => m.TeamModule),
      },
      {
        path: 'members',
        data: { state: 'members' },
        loadChildren: () => import('@modules/member/member.module')
          .then(m => m.MemberModule),
      },
      {
        path: 'ranking',
        data: { state: 'ranking' },
        loadChildren: () => import('@modules/score/score.module')
          .then(m => m.ScoreModule),
      },
      {
        path: 'stream',
        component: ChampionshipStreamPage,
        data: { state: 'stream' },
      },
      {
        path: 'admin',
        canActivate: [AdminGuard],
        data: { state: 'championship-admin' },
        loadChildren: () => import('@modules/admin-championship/admin-championship.module')
          .then(m => m.AdminChampionshipModule),
      },
    ],
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class ChampionshipRoutingModule {
  public static components = [
    ChampionshipPage,
    ChampionshipStreamPage,
  ];
}
