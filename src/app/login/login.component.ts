import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public userName = new FormControl('', Validators.required);
  public password = new FormControl('', Validators.required);
  constructor(private loginService: LoginService, private route: Router, private userService: UserService) { }
  public isLoggedIn : boolean = false;
  public userData : any;

  ngOnInit(): void {
  }

  LoginUser() {
    // When the form fields are valid
    if(this.userName.valid && this.password.valid)
    {
        // Invoke the LoginUser method
        this.loginService.LoginUser({email: this.userName.value, password: this.password.value}).subscribe((data: any) => {
            // Set the userData and isLoggedIn
            this.userData = data.userData;
            this.isLoggedIn = true;
            // Set the token, isLoggedIn and userData in the local storage
            localStorage.setItem('token', data.access_token);
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userData', JSON.stringify(data.userData));
            // Invoke the user service's SendMessage method
            this.userService.SendMessage({userData: this.userData, isLoggedIn: this.isLoggedIn});
            // Route to login
            this.route.navigateByUrl('/');
        })
    } 
  }
}
