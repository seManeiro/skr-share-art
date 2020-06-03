
import { Component, OnInit } from '@angular/core';
import {AuthService } from '../../../services/auth.service';
import { Router } from "@angular/router";
import { NgForm}   from '@angular/forms';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent  {

  user = {
    email: '',
    password: ''
  };

  error: String;

  constructor(private authService: AuthService, private router: Router) {

  }


  signInWithEmail() {

    this.authService.signInRegular(this.user.email, this.user.password)
    .then((res) => {

    console.log('respuesta de fireAuth: '+res);
    localStorage.setItem('user', this.authService.encrypt(this.user));

    this.router.navigate(['']);
  })
  .catch((err) => {
    this.error = err;
    localStorage.setItem('user', null);
  }

  );
 }


}





