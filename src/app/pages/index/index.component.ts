import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();
const TOKEN_KEY = 'access_token';
// tslint:disable-next-line: no-non-null-assertion
const jwt = localStorage.getItem(TOKEN_KEY)!;
const isExpired = helper.isTokenExpired(jwt);

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  isUser = false

  constructor(

  ) { }

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
  }

}
