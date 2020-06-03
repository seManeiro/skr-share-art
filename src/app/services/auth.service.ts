import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import * as CryptoJS from 'crypto-js';
import {cryptoKey } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private _firebaseAuth: AngularFireAuth, private router: Router) {

  }


    encrypt(user){
      return CryptoJS.AES.encrypt(JSON.stringify(user), cryptoKey).toString();
    }

    signInRegular(email, password) {
      return this._firebaseAuth.signInWithEmailAndPassword(email, password)

   }

    isLoggedIn() {
      if(!localStorage.getItem('user'))
      return false;
      else
      return true;
    }

    doRegister(value){
      return new Promise<any>((resolve, reject) => {
        this._firebaseAuth.createUserWithEmailAndPassword(value.email, value.password)
        .then(res => {
          resolve(res);
        }, err => reject(err))
      })
    }




    logout() {

      this._firebaseAuth.signOut().then(async (res) => {
        localStorage.removeItem('user');
        await this.router.navigate(['login']);
        }
        );
      }



}
