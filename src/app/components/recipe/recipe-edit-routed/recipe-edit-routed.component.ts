import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-edit-routed',
  templateUrl: './recipe-edit-routed.component.html',
  styleUrls: ['./recipe-edit-routed.component.css']
})
export class RecipeEditRoutedComponent implements OnInit {
  id: number = 1;

  constructor(
    private oActivatedRoute: ActivatedRoute
  ) {
    this.id = parseInt(this.oActivatedRoute.snapshot.paramMap.get("id") || "1");
   }

  ngOnInit() {
  }

}
