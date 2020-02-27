import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { AdminGuard, AuthGuard, ChampionshipAdminGuard, NotLoggedGuard } from './guards';
import { ApiPrefixInterceptor, ErrorHandlerInterceptor, JWTTokenInterceptor } from './interceptors';

import { NotificationModule } from '../modules/notification/notification.module';
import { throwIfAlreadyLoaded } from './guards/module-import.guard';
import { ApplicationService, WINDOW_PROVIDERS } from './services';

export const useFactory = (service: ApplicationService) => () => service.initialize();

@NgModule({
  imports: [
    NotificationModule
  ],
  exports: [
    NotificationModule
  ],
  providers: [
    AuthGuard,
    AdminGuard,
    NotLoggedGuard,
    ChampionshipAdminGuard,
    WINDOW_PROVIDERS,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JWTTokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiPrefixInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory,
      deps: [ApplicationService],
      multi: true
    }
  ]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule
    };
  }

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, CoreModule.name);
  }
}
