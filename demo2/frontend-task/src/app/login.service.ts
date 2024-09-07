import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginUrl = 'http://localhost:8080/api/users/login';

  constructor(private http: HttpClient) {}

  login(userData: any): Observable<any> {
    return this.http.post(this.loginUrl, userData, { responseType: 'text' }); // JWT string döndüğünü belirtiyoruz
  }
}
