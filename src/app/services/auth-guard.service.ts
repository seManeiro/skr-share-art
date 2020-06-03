import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthService) { }

    public canActivate() {
        if ( this.authService.isLoggedIn() ) {
            return true;
        }
        this.router.navigate(['/']);
        return false;
    }

}


