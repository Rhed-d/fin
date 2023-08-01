import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthAurdService {

  constructor(private auth: UserService, private router: Router) { }

  canActivate(): boolean {
    if (this.auth.storedToken() !== true) {
      window.confirm('Please login');
      this.router.navigateByUrl('users/login');
      return false;
    } else {
      return true;
    }
  }
}
