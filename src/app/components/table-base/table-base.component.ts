import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { MatTable } from '@angular/material/table';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-table-base',
  templateUrl: './table-base.component.html',
  styleUrls: ['./table-base.component.css'],
})
export class TableBaseComponent implements OnInit, AfterViewInit {
  tableData: any;
  pageSize: number = 10;
  totalRows: number = 0;
  pageIndex: number = 0;
  displayedColumns: string[] = ['id', 'name', 'username', 'email'];

  @ViewChild(MatTable) table: MatTable<any> | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(
    private router: Router,
    private usersService: UsersService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  ngAfterViewInit(): void {
    this.paginator?.page.subscribe((data) => {
      if (this.paginator) {
        this.pageSize = this.paginator.pageSize;
        this.pageIndex = this.paginator?.pageIndex;
      }
      this.fetchData();
    });
  }

  navigate(row: any) {
    this.router.navigate(['/user'], { queryParams: { id: row.id } });
  }

  fetchData(): void {
    this.usersService
      .getPaginatedUsers(this.pageSize, this.pageIndex)
      .subscribe((data) => {
        this.tableData = data;
      });
  }

  renderRows(): void {
    this.fetchData();
    this.table?.renderRows();
  }

  addNewUser() {
    const dialogRef = this.dialog.open(UserDetailComponent);
    dialogRef.afterClosed().subscribe((action) => {
      if (action.event == 'Refresh') {
        this.renderRows();
      }
    });
  }
}
