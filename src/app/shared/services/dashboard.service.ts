import { Injectable } from '@angular/core';

import { HttpClient } from './../config/HttpClient';
import { environment } from './../../../environments/environment';

@Injectable()
export class DashboardService {
  dashboard: any;
  endpoint = '/api/dashboard';

  constructor(    
    private httpClient: HttpClient
  ) { 

  }

getDashboard() {
  const url = environment.URL_BASE + this.endpoint;
  console.log(url);
  return this.httpClient.get(url)
    .map((response: Response) => {
      this.dashboard = JSON.parse(JSON.stringify(response.json()));
      return this.dashboard;
    })
    .toPromise();
  }
}