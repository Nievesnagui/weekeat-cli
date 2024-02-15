import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-weekly-edit-routed',
  templateUrl: './weekly-edit-routed.component.html',
  styleUrls: ['./weekly-edit-routed.component.css']
})
export class WeeklyEditRoutedComponent implements OnInit {
  id: number = 1;

  constructor(
    private oActivatedRoute: ActivatedRoute
  ) {
    this.id = parseInt(this.oActivatedRoute.snapshot.paramMap.get("id") || "1");
   }

  ngOnInit() {
  }

}
