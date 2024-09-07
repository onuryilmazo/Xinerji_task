import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule
  ]
})
export class HomeComponent {
  constructor(private router: Router) {}

  onLogout() {
    // Token'ı localStorage'dan veya sessionStorage'dan temizle
    localStorage.removeItem('token');  // Eğer token'ı localStorage'da saklıyorsan
    sessionStorage.removeItem('token');  // Eğer sessionStorage kullanıyorsan (opsiyonel)
  
    // Kullanıcıyı login sayfasına yönlendir
    this.router.navigate(['/login']);
  }
  
}
