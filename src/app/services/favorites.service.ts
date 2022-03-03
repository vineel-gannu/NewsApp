import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor(private httpService: HttpClient) { }

  GetAllFavorites() {
    return this.httpService.get(environment.favorites);
  }

  AddFavorite(favorite: any) {
    return this.httpService.post(environment.favorites, favorite);
  }

  DeleteFavorite(id) {
    return this.httpService.delete(`${environment.favorites}/${id}`);
  }
}
