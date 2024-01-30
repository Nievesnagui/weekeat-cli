import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-recipe-detail-routed',
  templateUrl: './admin-recipe-detail-routed.component.html',
  styleUrls: ['./admin-recipe-detail-routed.component.css']
})
export class AdminRecipeDetailRoutedComponent implements OnInit {

  id: number = 1;

  constructor(
    private oActivatedRoute: ActivatedRoute
  ) {
    this.id = parseInt(this.oActivatedRoute.snapshot.paramMap.get("id") || "1");
   }

  ngOnInit() {
  }

}
