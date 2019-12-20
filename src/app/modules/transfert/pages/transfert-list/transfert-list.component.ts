import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Transfert, Member } from '@app/core/models';
import { TransfertService, ApplicationService } from '@app/core/services';
import { tableRowAnimation } from '@app/core/animations';
import { SharedService } from '@app/shared/services/shared.service';

@Component({
  selector: 'fm-transfert-list',
  templateUrl: './transfert-list.component.html',
  styleUrls: ['./transfert-list.component.scss'],
  animations: [tableRowAnimation]
})
export class TransfertListComponent implements OnInit {
  teamId?: number;
  dataSource: MatTableDataSource<Transfert>;
  displayedColumns = ['old_member', 'new_member', 'constraint', 'matchday'];

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private transfertService: TransfertService,
    private route: ActivatedRoute,
    private ref: ChangeDetectorRef,
    public app: ApplicationService
  ) { }

  ngOnInit() {
    this.teamId = SharedService.getTeamId(this.route);
    if (this.teamId) {
      // this.dataSource._updateChangeSubscription = () => this.dataSource.sort = this.sort;
      this.transfertService.getTransfert(this.teamId).subscribe(data => {
        this.dataSource = new MatTableDataSource<Transfert>(data);
        if (data.length) {
          this.dataSource.sortingDataAccessor = this.sortingDataAccessor;
          this.ref.detectChanges();
          this.dataSource.sort = this.sort;
        }
      });
    }
  }

  sortingDataAccessor(data: Transfert, sortHeaderId: string) {
    let value;
    switch (sortHeaderId) {
      case 'old_member': value = data.old_member.player.full_name; break;
      case 'new_member': value = data.new_member.player.full_name; break;
    }
    if (typeof value === 'string' && !value.trim()) {
      return value;
    }
    value = value || '';
    return isNaN(+value) ? value : +value;
  }
}
