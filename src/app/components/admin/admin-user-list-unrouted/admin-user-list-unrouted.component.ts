import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ConfirmEventType, ConfirmationService } from 'primeng/api';
import { PaginatorState } from 'primeng/paginator';
import { Subject, debounceTime, of, switchMap } from 'rxjs';
import { IUser, IUserPage } from 'src/app/model/model.interface';
import { UserService } from 'src/app/service/user.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AdminUserDetailUnroutedComponent } from '../admin-user-detail-unrouted/admin-user-detail-unrouted.component';


@Component({
  selector: 'app-admin-user-list-unrouted',
  templateUrl: './admin-user-list-unrouted.component.html',
  styleUrls: ['./admin-user-list-unrouted.component.css']
})
export class AdminUserListUnroutedComponent implements OnInit {
  
  @Input() forceReload: Subject<boolean> = new Subject<boolean>();

  oPage: IUserPage | undefined;
  orderField: string = "id";
  orderDirection: string = "asc";
  oPaginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0 };
  status: HttpErrorResponse | null = null;
  oUserToRemove: IUser | null = null;

  constructor(
    private oUserService: UserService,
    private oConfirmationService: ConfirmationService,
    public oDialogService: DialogService
  ) { }

  ngOnInit() {
    this.getPage();
    this.forceReload.subscribe({
      next: (v) => {
        if (v) {
          this.getPage();
        }
      }
    });
  }
  search(filterValue: string): void {
    if (filterValue && filterValue.length >= 3) {
      this.oUserService.getPage(this.oPaginatorState.rows, this.oPaginatorState.page, this.orderField, filterValue)
        .pipe(
          debounceTime(500),
          switchMap((data: IUserPage) => {
            return of(data);
          })
        )
        .subscribe(
          (data: IUserPage) => {
            this.oPage = data;
          },
          (error: any) => {
            // Handle error
            console.error(error);
          }
        );
    } else {
      this.oUserService.getPage(this.oPaginatorState.rows, this.oPaginatorState.first, 'id', 'asc')
        .subscribe(
          (data: IUserPage) => {
            this.oPage = data;
          },
          (error: any) => {
            console.error(error);
          }
        );
    }
  }
  getValue(event: any): string {
    return event.target.value;
  }
  getPage(): void {
    this.oUserService.getPage(this.oPaginatorState.rows, this.oPaginatorState.page, this.orderField).subscribe({
      next: (data: IUserPage) => {
        this.oPage = data;
        this.oPaginatorState.pageCount = data.totalPages;
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    })
  }

  onPageChang(event: PaginatorState) {
    this.oPaginatorState.rows = event.rows;
    this.oPaginatorState.page = event.page;
    this.getPage();
  }

  doOrder(fieldorder: string) {
    this.orderField = fieldorder;
    if (this.orderDirection == "asc") {
      this.orderDirection = "desc";
    } else {
      this.orderDirection = "asc";
    }
    this.getPage();
  }

  ref: DynamicDialogRef | undefined;

  doView(u: IUser) {
    this.ref = this.oDialogService.open(AdminUserDetailUnroutedComponent, {
      data: {
        id: u.id
      },
      header: 'View of user',
      width: '50%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: false
    });
  }
  showConfirmationModal = false;
  doRemove(u: IUser) {
    this.oUserToRemove = u;
  
    if (this.oUserToRemove?.id !== undefined) {
      // Mostrar el modal de confirmación
      this.showConfirmationModal = true;
    } else {
      console.error('User ID is undefined or null');
    }
  }
  
  confirmRemove() {
    // Lógica de eliminación aquí
    this.oUserService.removeOne(this.oUserToRemove?.id).subscribe({
      next: () => {
        this.getPage();
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    });
  
    // Cerrar el modal de confirmación después de confirmar
    this.showConfirmationModal = false;
  }
  
  cancelRemove() {
    // Cancelar la eliminación y cerrar el modal de confirmación
    console.log('User not removed');
    this.showConfirmationModal = false;
  }
  
  
}
