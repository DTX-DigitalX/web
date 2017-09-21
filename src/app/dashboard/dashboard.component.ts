import { TruncatePipe } from './../shared/pipes/truncate.pipe';
import { Idea } from './../shared/models/idea.model';
import { DashboardService } from './../shared/services/dashboard.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  constructor(
    private dashboardService: DashboardService
  ) { 
    
  }

  ngOnInit() {
  }

}
