import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private httpService: HttpClient) { }

  getNews() {
    return this.httpService.get(`${environment.newsHeadLines}?country=us&apiKey=${environment.newsAPIKey}`);
  }
}