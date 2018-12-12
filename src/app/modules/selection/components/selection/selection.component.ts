import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSelect } from '@angular/material/select';
import { Selection, Member } from '@app/core/models';
import { SelectionService, MemberService, ApplicationService } from '@app/core/services';
import { SharedService } from '@app/shared/services/shared.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'fm-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss']
})
export class SelectionComponent implements OnInit {
  @ViewChild(MatSelect) newMember: MatSelect;
  @ViewChild(NgForm) selectionForm: NgForm;

  selection: Selection = new Selection();
  members: Member[];
  newMembers: Member[];

  constructor(
    public snackBar: MatSnackBar,
    private selectionService: SelectionService,
    private app: ApplicationService,
    private changeRef: ChangeDetectorRef,
    private memberService: MemberService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const team_id = SharedService.getTeamId(this.route);
    this.selectionService.getSelection(team_id).subscribe(selection => {
      if (selection) {
        this.selection = selection;
        this.playerChange();
      }
    });
    this.memberService.getByTeamId(team_id).subscribe(members => {
      this.members = members;
      const buyingMember = localStorage.getItem('buyingMember');
      if (buyingMember) {
        localStorage.removeItem('buyingMember');
        const member = JSON.parse(buyingMember);
        this.memberService
          .getFree(this.app.championship.id, member.role_id)
          .subscribe(members2 => {
            this.newMembers = members2;
            this.selection.new_member = member;
            this.selection.new_member_id = member.id;
            this.newMember.disabled = false;
            this.members.filter(function (value, index) {
              return value.role_id === member.role_id;
            });
            this.changeRef.detectChanges();
          });
      }
    });
  }

  playerChange() {
    if (this.selection.old_member) {
      this.newMember.disabled = true;
      this.memberService.getFree(this.app.championship.id, this.selection.old_member.role_id, false)
        .subscribe(members => {
          this.newMembers = members;
          this.changeRef.detectChanges();
          this.newMember.disabled = false;
        });
    }
  }

  compareFn(c1: Member, c2: Member): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  save() {
    if (this.selectionForm.valid) {
      const selection = new Selection();
      if (this.selection.id) {
        selection.id = this.selection.id;
      }
      selection.new_member_id = this.selection.new_member.id;
      selection.old_member_id = this.selection.old_member.id;
      selection.team_id = this.app.team.id;
      let obs = null;
      if (selection.id) {
        obs = this.selectionService.update(selection);
      } else {
        obs = this.selectionService.create(selection);
      }
      obs.subscribe(response => {
        this.snackBar.open('Selezione salvata correttamente', null, {
          duration: 3000
        });
        this.selection.id = response.id;
      },
        err => SharedService.getUnprocessableEntityErrors(this.selectionForm, err)
      );
    }
  }
}