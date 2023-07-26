import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../http/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder ,
              private  authService : AuthService,
              private router : Router){}

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      email : this.formBuilder.control(""),
      password : this.formBuilder.control("")
    });
  }

handlerlogin() {

     let email = this.loginForm.value.email;
     let password  = this.loginForm.value.password;

     this.authService.login(email, password).subscribe({
      next: (data) =>{

        console.log(data);
        this.authService.loadProfile(data);
        this.router.navigateByUrl("/environment/1/facturation")

      },
      error: (e) => console.log(e),

     });
}




}
