import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Subject } from 'rxjs';
import { RecipeService } from 'src/app/service/recipe.service';

@Component({
  selector: 'app-recipe-list-routed',
  templateUrl: './recipe-list-routed.component.html',
  styleUrls: ['./recipe-list-routed.component.css']
})
export class RecipeListRoutedComponent implements OnInit {


  constructor(

  ) { 
  }

  ngOnInit() {
  }

}
