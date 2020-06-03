import { Component, OnInit } from '@angular/core';
import {AuthService } from '../../services/auth.service';
import { Router } from "@angular/router";


@Component({
  selector: 'nav-root',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  isLoggedIn : boolean= false;

  constructor(public authService :AuthService, private router :Router) {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  isLooggedIn(){
    this.isLoggedIn = this.authService.isLoggedIn();
  }

}
