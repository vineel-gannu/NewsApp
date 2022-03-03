import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public isLoggedIn : boolean = false;
  public userData : any;
  public firstName: string;
  public lastName: string; 
  constructor(private userService: UserService, private loginService: LoginService, private route: Router) { }

  ngOnInit(): void {
    // Set the userData and isLoggedIn from the local storage
    this.userData = localStorage.getItem('userData') != null ? JSON.parse(localStorage.getItem('userData')) : '';
    this.isLoggedIn = localStorage.getItem('isLoggedIn') == 'true' ? true : false;
    // Receive the userData and isLoggedIn from the user service
    this.userService.ReceiveMessage().subscribe(data => {
      this.userData = data.userData;
      this.isLoggedIn = data.isLoggedIn;
    });
  }

  LogoutUser() {
    // Invoke the LogoutUser method
    this.loginService.LogoutUser();
    // Invoke the user service's SendMessage method
    this.userService.SendMessage({});
    // Route to login
    this.route.navigateByUrl('/login');
  }
}
