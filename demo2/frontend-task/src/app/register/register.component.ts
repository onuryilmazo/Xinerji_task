import { Component } from '@angular/core';
import { RegisterService } from '../register.service';
import { FormsModule} from '@angular/forms';
import { NgFor } from "@angular/common";
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ 
    NgFor,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule
    ],  
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  password: string = '';

  constructor(private registerService: RegisterService, private router: Router) {}

  goToLogin() {
    this.router.navigate(['/login']);
  }

  // Form gönderildiğinde bu fonksiyon çalışır
  onSubmit() {
    const userData = {
      username: this.username,
      password: this.password
    };

    // Servis ile backend'e POST isteği yapıyoruz
    this.registerService.registerUser(userData).subscribe({
      next: (response) => {
        console.log('Registration successful', response);
        this.router.navigate(['/login']);
        alert('Registration successful');
      },
      error: (error) => {
        console.error('Registration failed', error);
        alert('Registration failed');
      }
    });
  }
}
