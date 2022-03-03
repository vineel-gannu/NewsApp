import { FactoryTarget } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../services/favorites.service';
import { NewsService } from '../services/news.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public isLoggedIn: boolean = false;
  public userDetails: any;
  public articles: any;
  public favorites: any;
  constructor( private userService: UserService, private newsService: NewsService, private favoritesService: FavoritesService) { }

  ngOnInit(): void {
    // Set the userData and isLoggedIn from the local storage
    this.userDetails = localStorage.getItem('userData') != null ? localStorage.getItem('userData') : '';
    this.isLoggedIn = localStorage.getItem('isLoggedIn') == 'true' ? true : false;
    
    // Get the news/articles
    this.GetNews();

    // Get the user favorites
    this.GetUserFavorites();
  }

  GetNews() {
      // Get the news/articles from the API
      this.newsService.getNews()
      .subscribe((data: any) =>{
         this.articles = data.articles.filter(article => article.description != null && article.title != null);
         this.articles.sort((a1, a2) => {return a1.description.length - a2.description.length;})
       })
  }

  IsArticleInUserFavorites(title) {
    return this.favorites != null ? this.favorites.some(item => {return item.title == title}) : false;
  }

  AddFavorite(article) {
    // Set the current user's email address in the article
    article.email = JSON.parse(localStorage.getItem('userData')).email;
    // Add the article to favorites DB if it is not already added, specific to user
    if(!this.IsArticleInUserFavorites(article.title))
          this.favoritesService.AddFavorite(article).subscribe(() => this.GetUserFavorites());
  }

  GetUserFavorites() {
    // Get all the favorite articles from DB and filter based on the current user
    this.favoritesService.GetAllFavorites().subscribe((data: any) => {
      this.favorites = data.filter(item => item.email == JSON.parse(localStorage.getItem('userData'))['email']);
    });
  }
}

