import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private httpService: HttpClient) { }

  RegisterUser(user: any) {
    return this.httpService.post(`${environment.authRegister}`, user);
  }
}
