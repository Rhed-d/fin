import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminLoginGaurdService {


  constructor(private auth: UserService, private router: Router) { }

  canActivate(): boolean {
    if (this.auth.storedToken() !== true) {
      return true;
    } else {
      this.router.navigateByUrl('/adminbackend/dashboard');
      return false;
    }
  }
}
