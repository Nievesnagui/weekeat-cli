import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IRecipe } from 'src/app/model/model.interface';
import { RecipeService } from 'src/app/service/recipe.service';

@Component({
  selector: 'app-recipe-detail-unrouted',
  templateUrl: './recipe-detail-routed.component.html',
  styleUrls: ['./recipe-detail-routed.component.css']
})
export class RecipeDetailRoutedComponent implements OnInit {
  id: number = 1;

  constructor(
    private oActivatedRoute: ActivatedRoute
  ) {
    this.id = parseInt(this.oActivatedRoute.snapshot.paramMap.get("id") || "1");
   }

  ngOnInit() {
  }


}
