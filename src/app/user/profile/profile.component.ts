import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../shared/auth/auth.service';
import { UserService } from '../user.service';
import { PushService } from '../../shared/push/push.service';
import { User } from '../user';
import { share } from 'rxjs/operators/share';
import { take } from 'rxjs/operators/take';

@Component({
  selector: 'fm-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userObservable: Observable<User>;
  user: User;
  repeat_password: String;
  push: boolean;

  constructor(
    public snackBar: MatSnackBar,
    private authService: AuthService,
    private userService: UserService,
    private pushService: PushService
  ) { }

  ngOnInit() {
    this.user = Object.assign({}, this.authService.user);
    this.pushService.swPush.subscription
      .pipe(take(1))
      .subscribe(subscription => (this.push = true));
    // this.push = this.pushService.isSubscribed();
  }

  save() {
    if (this.user.password === this.repeat_password) {
      this.userObservable = this.userService.update(this.user).pipe(share());
      this.userObservable.subscribe(response => {
        this.snackBar.open('Modifiche salvate', null, {
          duration: 3000
        });
        this.authService.user = this.user;
        localStorage.setItem('currentUser', JSON.stringify(this.user));
      });
    }
  }

  togglePush() {
    if (this.push) {
      this.pushService.subscribeToPush();
    } else {
      this.pushService.unsubscribeFromPush();
    }
  }
}