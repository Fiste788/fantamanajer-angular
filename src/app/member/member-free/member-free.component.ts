import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { MemberService } from '../member.service';
import { Member } from '../member';
import { Role } from '../../role/role';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'fm-member-free',
  templateUrl: './member-free.component.html',
  styleUrls: ['./member-free.component.scss']
})
export class MemberFreeComponent implements OnInit {

  members: Member[] = [];
  selectedRole: Role;
  roles: Role[] = [];

  constructor(
    private changeRef: ChangeDetectorRef,
    private memberService: MemberService,
    private shared: SharedService) {
      this.roles.push(new Role(1, 'Portiere'));
      this.roles.push(new Role(2, 'Difensore'));
      this.roles.push(new Role(3, 'Centrocampista'));
      this.roles.push(new Role(4, 'Attaccante'));
      this.selectedRole = this.roles[0];
     }

  ngOnInit() {
    this.roleChange();
  }

  roleChange() {
    this.members = [];
    this.memberService.getFree(this.shared.currentChampionship.id, this.selectedRole.id).then(members => {
      this.members = members;
      this.changeRef.detectChanges();
    });
  }

}
