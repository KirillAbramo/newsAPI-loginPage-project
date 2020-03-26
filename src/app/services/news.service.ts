import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})

export class NewsService {
  apiUrl = environment.apiUrl;
  apiKey = environment.apiKey;

  constructor(private http: HttpClient) { }


  getData(url) {
    return this.http.get(`${this.apiUrl}/${url}&apiKey=${this.apiKey}`)
  }

}
