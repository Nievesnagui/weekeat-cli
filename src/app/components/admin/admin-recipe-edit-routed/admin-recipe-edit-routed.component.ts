import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-recipe-edit-routed',
  templateUrl: './admin-recipe-edit-routed.component.html',
  styleUrls: ['./admin-recipe-edit-routed.component.css']
})
export class AdminRecipeEditRoutedComponent implements OnInit {
  id: number = 1;

  constructor(
    private oActivatedRoute: ActivatedRoute
  ) {
    this.id = parseInt(this.oActivatedRoute.snapshot.paramMap.get("id") || "1");
   }

  ngOnInit() {
  }

}
