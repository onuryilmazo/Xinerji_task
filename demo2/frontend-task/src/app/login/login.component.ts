import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NgFor,
    FormsModule,
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private loginService: LoginService, private router: Router) {}

  goToRegister() {
    this.router.navigate(['/register']);
  }

  onSubmit() {
    const userData = {
      username: this.username,
      password: this.password
    };
  
    this.loginService.login(userData).subscribe({
      next: (response: any) => {  // JWT token beklediğimiz için any kullanıyoruz
        console.log('Giriş başarılı: ', response);  // Geri dönen JWT token’ı logla
        if (response) {
          localStorage.setItem('token', response);  // JWT token’ı localStorage’a kaydet
          console.log('Token başarıyla saklandı: ', response);
          alert('Login successful'); // Başarılı giriş mesajı göster
          this.router.navigate(['/home']);  // Home sayfasına yönlendir
        } else {
          console.log('Geçersiz kullanıcı adı veya şifre');
          alert('Invalid username or password');
        }
      },
      error: (error) => {
        console.error('Giriş başarısız oldu', error);
        this.errorMessage = 'Login failed: An error occurred';  // Hata mesajını değişkene ata
        alert(this.errorMessage);
      }
    });
  }
}
