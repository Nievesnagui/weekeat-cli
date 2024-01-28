import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-type-detail-routed',
  templateUrl: './admin-type-detail-routed.component.html',
  styleUrls: ['./admin-type-detail-routed.component.css']
})
export class AdminTypeDetailRoutedComponent implements OnInit {

  id: number = 1;

  constructor(
    private oActivatedRoute: ActivatedRoute
  ) {
    this.id = parseInt(this.oActivatedRoute.snapshot.paramMap.get("id") || "1");
   }

  ngOnInit() {
  }

}
