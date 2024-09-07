import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';  // JWT için kütüphaneyi kullan

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private jwtHelper: JwtHelperService) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');  // localStorage'da JWT token var mı kontrol et

    if (token && !this.jwtHelper.isTokenExpired(token)) {  // Token varsa ve geçerli ise
      return true;
    } else {
      // Token yoksa ya da süresi dolmuşsa, login sayfasına yönlendir
      this.router.navigate(['/login']);
      return false;
    }
  }
}
