import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpService: HttpClient) { }

  LoginUser(user: any) {
    return this.httpService.post(environment.authLogin, user);
  }

  LogoutUser() {
    localStorage.clear();
  }

  IsAuthenticated(token) {
    return this.httpService.post(environment.authUser, null, {
      headers : {
        'Authorization': `Bearer ${token}`
      }
    })
  }
}
