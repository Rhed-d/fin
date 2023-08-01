import { Component, Input, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();
const TOKEN_KEY = 'access_token';
// tslint:disable-next-line: no-non-null-assertion
const jwt = localStorage.getItem(TOKEN_KEY)!;
const isExpired = helper.isTokenExpired(jwt);

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  isUser = false
  isVisible = false

  @Input() sendRef: any

  constructor() { }

  checkIntersection() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        this.isVisible = entry.isIntersecting
      });
    })

    observer.observe(this.sendRef)
  }

  checkIfLoggedIn() {
    if (jwt) {
      if (isExpired) {
        localStorage.removeItem(TOKEN_KEY)
        this.isUser = false
      } else {
        this.isUser = true
      }
    } else {
      this.isUser = false
    }
  }

  ngOnInit(): void {
    this.checkIfLoggedIn()
    this.checkIntersection()
  }

}
