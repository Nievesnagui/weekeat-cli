import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-type-edit-routed',
  templateUrl: './admin-type-edit-routed.component.html',
  styleUrls: ['./admin-type-edit-routed.component.css']
})
export class AdminTypeEditRoutedComponent implements OnInit {

  id: number = 1;

  constructor(
    private oActivatedRoute: ActivatedRoute
  ) { 
    this.id = parseInt(this.oActivatedRoute.snapshot.paramMap.get("id") || "1");
  }

  ngOnInit() {
  }

}
