import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-ingredient-detail-routed',
  templateUrl: './admin-ingredient-detail-routed.component.html',
  styleUrls: ['./admin-ingredient-detail-routed.component.css']
})
export class AdminIngredientDetailRoutedComponent implements OnInit {

  id: number = 1;

  constructor(
    private oActivatedRoute: ActivatedRoute,
  ) { 
    this.id = parseInt(this.oActivatedRoute.snapshot.paramMap.get("id") || "1");
  }

  ngOnInit() {
  }

}
