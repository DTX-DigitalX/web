import { HttpClient } from './../config/HttpClient';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { IdeaDto } from './../models/idea.model';

@Injectable()
export class IdeaService {
  idea: IdeaDto;
  endpoint = "/api/idea";

  constructor(
    private httpClient: HttpClient

  ) { }

  postIdea(idea) {
    let url = environment.URL_BASE + this.endpoint;
    return this.httpClient.post(url, idea)
      .map((response: Response) => {
        return <any>response.json();
      })
      .toPromise();
  }

  getAllIdea() {
    let url = environment.URL_BASE + this.endpoint;
    return this.httpClient.get(url)
      .map((response: Response) => {
        return <any>response.json();
      })
      .toPromise();
  }
  
  getIdea(id) {
    let url = environment.URL_BASE + this.endpoint + '/byId/' + id;
    return this.httpClient.get(url)
      .map((response: Response) => {
        return <any>response.json();
      })
      .toPromise();
  }

  getMyIdeas(page, nameFilter, sort) {
    let url = environment.URL_BASE + this.endpoint + '/myIdeas?page=' + page +
      '&nameFilter=' + nameFilter
      + sort;
    return this.httpClient.get(url)
      .map((response: Response) => {
        return <any>response.json();
      })
      .toPromise();
  }
}
