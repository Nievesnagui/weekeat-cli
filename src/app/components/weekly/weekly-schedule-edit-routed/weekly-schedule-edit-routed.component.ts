import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-weekly-schedule-edit-routed',
  templateUrl: './weekly-schedule-edit-routed.component.html',
  styleUrls: ['./weekly-schedule-edit-routed.component.css']
})
export class WeeklyScheduleEditRoutedComponent implements OnInit {

  id: number = 1;

  constructor(
    private oActivatedRoute: ActivatedRoute
  ) {
    this.id = parseInt(this.oActivatedRoute.snapshot.paramMap.get("id") || "1");
   }
  ngOnInit() {
  }

}
