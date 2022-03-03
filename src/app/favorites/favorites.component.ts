import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../services/favorites.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  public favorites: Array<any>;
  constructor(private favoritesService: FavoritesService) { }

  ngOnInit(): void {
    // Get the user's favorite articles
    this.GetUserFavorites();
  }

  RemoveFromFavorites(Id) {
    // Remove the article from user favorites
    this.favoritesService.DeleteFavorite(Id).subscribe(() => {
      const index = this.favorites.findIndex(item => {
        return item.id == Id;
      })
      // Remove the article from favorites property
      this.favorites.splice(index, 1);
    })
  }

  GetUserFavorites() {
    // Get all the favorite articles from DB and filter based on the current user
    this.favoritesService.GetAllFavorites().subscribe((data: any) => {
      this.favorites = data.filter(item => item.email == JSON.parse(localStorage.getItem('userData'))['email']);
    });
  }
}
