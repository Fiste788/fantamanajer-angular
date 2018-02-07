import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { AuthService } from '../../shared/auth/auth.service';

@Component({
  selector: 'fm-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    public auth: AuthService,
    public shared: SharedService,
  ) { }

  ngOnInit() {
  }

}
