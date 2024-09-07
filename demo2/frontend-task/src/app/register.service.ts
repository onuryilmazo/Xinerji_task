import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private apiUrl = 'http://localhost:8080/api/users/register';  // Backend URL

  constructor(private http: HttpClient) { }

  // Kullanıcı kayıt isteği gönderen metod
  registerUser(userData: any): Observable<any> {
    return this.http.post(this.apiUrl, userData);
  }
}
