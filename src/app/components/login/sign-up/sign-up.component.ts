import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  registerForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  });

  successMessage:string;
  errorMessage:string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  tryRegister(value){
    this.authService.doRegister(value)
    .then(res => {
      console.log(res);
      this.errorMessage = "";
      this.successMessage = "The account has been registrated successfuly.";
      console.log('respuesta de fireAuth: '+res);
      this.router.navigate(['']);

    }, err => {
      console.log(err);
      this.errorMessage = err;
      this.successMessage = "";
    })
  }



}
