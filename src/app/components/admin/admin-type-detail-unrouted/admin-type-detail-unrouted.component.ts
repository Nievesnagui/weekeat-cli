import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { IType } from 'src/app/model/model.interface';
import { SessionService } from 'src/app/service/session.service';
import { TypeService } from 'src/app/service/type.service';

@Component({
  selector: 'app-admin-type-detail-unrouted',
  templateUrl: './admin-type-detail-unrouted.component.html',
  styleUrls: ['./admin-type-detail-unrouted.component.css']
})
export class AdminTypeDetailUnroutedComponent implements OnInit {

  @Input() id: number = 1;

  oType: IType = {} as IType;
  status: HttpErrorResponse | null = null;

  constructor(
    private oTypeService: TypeService,
    private oSessionService: SessionService
  ) { }

  ngOnInit() {
    this.getOne();
  }

  getOne(): void {
    this.oTypeService.getOne(this.id).subscribe({
      next: (data: IType) => {
        this.oType = data;
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    })
  }

}
