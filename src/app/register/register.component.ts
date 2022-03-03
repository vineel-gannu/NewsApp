import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private registerService: RegisterService, private route: Router) { }

  public registerForm = this.formBuilder.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    age: [''],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirmpassword: ['', Validators.required]
    });

  ngOnInit(): void {
  }

  RegisterUser() {
    // If the form fields are valid
    if(this.registerForm.valid && this.registerForm.value.password == this.registerForm.value.confirmpassword) {
      // Invoke the RegisterUser method  
      this.registerService.RegisterUser(this.registerForm.value).subscribe((data: any) => {
          alert(`Registration Successful! Please login with your username(${this.registerForm.value.email}) and password`);
          this.route.navigateByUrl('/login');
          }, error => {
              alert(`User with ${this.registerForm.value.email} already exists. Please use a different email address.`);
             })
    }
  }

  // Form field getters
  get firstname() { return this.registerForm.get('firstname') }
  get lastname() { return this.registerForm.get('lastname') }
  get age() { return this.registerForm.get('age') }
  get email() { return this.registerForm.get('email') }
  get password() { return this.registerForm.get('password') }
  get confirmpassword() { return this.registerForm.get('confirmpassword') }
}
