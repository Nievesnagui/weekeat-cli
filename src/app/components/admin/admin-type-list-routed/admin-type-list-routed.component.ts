import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Subject } from 'rxjs';
import { TypeService } from 'src/app/service/type.service';

@Component({
  selector: 'app-admin-type-list-routed',
  templateUrl: './admin-type-list-routed.component.html',
  styleUrls: ['./admin-type-list-routed.component.css']
})
export class AdminTypeListRoutedComponent implements OnInit {

  forceReload: Subject<boolean> = new Subject<boolean>();
  bLoading: boolean = false;

  constructor(
    private oTypeService: TypeService,
    private oConfirmationService: ConfirmationService,
  ) { }

  ngOnInit() {
  }

}
