import { Component, ViewChild } from '@angular/core';
import { MatHorizontalStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { CredentialRequestOptionsJSON } from '@github/webauthn-json';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';

import { AuthenticationService } from '@app/authentication';
import { WebauthnService } from '@data/services';
import { ApplicationService } from '@app/services';
import { cardCreationAnimation } from '@shared/animations';

@Component({
  animations: [cardCreationAnimation],
  selector: 'app-login',
  styleUrls: ['./login.page.scss'],
  templateUrl: './login.page.html',
})
export class LoginPage {
  @ViewChild('stepper') private readonly stepper: MatHorizontalStepper;
  public loginData: {
    email?: string;
    password?: string;
    rememberMe: boolean;
  } = { rememberMe: true };
  public error = '';
  public token$: Observable<CredentialRequestOptionsJSON>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly authService: AuthenticationService,
    private readonly webauthnService: WebauthnService,
    private readonly app: ApplicationService,
  ) {}

  public login(): void {
    if (this.loginData.email && this.loginData.password) {
      this.authService
        .login(this.loginData.email, this.loginData.password, this.loginData.rememberMe)
        .subscribe((result) => {
          this.postLogin(result);
        });
    }
  }

  public tokenLogin(t: CredentialRequestOptionsJSON): void {
    if (this.loginData.email) {
      this.authService
        .webauthnLogin(this.loginData.email, this.loginData.rememberMe, t)
        .subscribe((result) => {
          this.postLogin(result);
        });
    }
  }

  public checkToken(): void {
    if (this.loginData.email) {
      this.token$ = this.webauthnService.get(this.loginData.email).pipe(share());
      this.token$.subscribe((t) => {
        this.tokenLogin(t);
        this.stepper.next();
      });
    }
  }

  public postLogin(result: boolean): void {
    if (result) {
      const url =
        (this.route.snapshot.queryParams.returnUrl as string | undefined) ??
        `/championships/${this.app.championship?.id ?? 0}`;
      void this.router.navigate([url]);
    } else {
      this.error = 'Username or password invalid';
    }
  }
}
