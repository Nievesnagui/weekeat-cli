import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-ingredient-edit-routed',
  templateUrl: './admin-ingredient-edit-routed.component.html',
  styleUrls: ['./admin-ingredient-edit-routed.component.css']
})
export class AdminIngredientEditRoutedComponent implements OnInit {
  id: number = 1;

  constructor(
    private oActivatedRoute: ActivatedRoute
  ) {
    this.id = parseInt(this.oActivatedRoute.snapshot.paramMap.get("id") || "1");
   }

  ngOnInit() {
  }

}
