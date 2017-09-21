import { Domains } from './../models/domains.model';
import { Injectable } from '@angular/core';

import { HttpClient } from './../config/HttpClient';
import { environment } from '../../../environments/environment';

@Injectable()
export class DomainsService {
  endpoint = "/api/idea/domains";
  domains: any;

  constructor(
    private httpClient: HttpClient
  ) { }

  getDomains() {
    let url = environment.URL_BASE + this.endpoint;
    console.log(url);
    return this.httpClient.get(url)
      .map((response: Response) => {
        return <any> response.json();
      })
      .toPromise();
  }
}
