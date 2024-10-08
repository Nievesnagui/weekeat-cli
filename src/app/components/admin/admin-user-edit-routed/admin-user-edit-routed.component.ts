import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-user-edit-routed',
  templateUrl: './admin-user-edit-routed.component.html',
  styleUrls: ['./admin-user-edit-routed.component.css']
})
export class AdminUserEditRoutedComponent implements OnInit {

  id: number = 1;

  constructor(
    private oActivatedRoute: ActivatedRoute
  ) { 
    this.id = parseInt(this.oActivatedRoute.snapshot.paramMap.get("id") || "1");

  }

  ngOnInit() {
  }

}
