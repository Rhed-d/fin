import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ProfileService } from '../services/profile.service';
import { MenuData } from './menuItems';

const helper = new JwtHelperService();
const TOKEN_KEY = 'access_token';
// tslint:disable-next-line: no-non-null-assertion
const jwt = localStorage.getItem(TOKEN_KEY)!;
const isExpired = helper.isTokenExpired(jwt);


declare interface User {
  _id: string;
  profilePicture: {
    url: string,
    public_id: string
  };
  SSN: string;
  email: string;
  firstName: string;
  lastName: string;
  refCode: string;
  walletAddress: string
  phoneNumber: string
}

interface Refs {
  firstName: string;
  lastName: string;
  createdOn: number;
}

@Component({
  selector: 'app-clientarea',
  templateUrl: './clientarea.component.html',
  styleUrls: ['./clientarea.component.scss']
})
export class ClientareaComponent implements OnInit {

  @ViewChild(MatSidenav) sidenav!: MatSidenav


  public UserInfo!: User;
  public showMenu = false;
  public showPage = false;
  public showFiller = false;
  public menuData = MenuData;
  loko = '<svg width="400" height="110"><rect width="300" height="100" style="fill:rgb(0,0,255);stroke-width:3;stroke:rgb(0,0,0)" /></svg>'

  referals: Refs[] = [];
  ref_count: number = 0;
  refCode = '';



  constructor(private profile: ProfileService, private observer: BreakpointObserver, private router: Router) { }

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }

  changeCurrency(cur: string) {
    this.profile.ChageBaseCurrency(cur)
  }

  logout(): any {
    localStorage.removeItem(TOKEN_KEY);
    this.router.navigateByUrl("/")
  }


  getUser() {
    this.profile.getUserInfor().subscribe(res => {
      this.UserInfo = res;
      this.showPage = true
      this.getRef();
    })
  }

  getRef() {
    const refCode = this.UserInfo.refCode
    this.profile.getReferals(refCode).subscribe(res => {
      this.referals = res;
      this.ref_count = this.referals.length
      localStorage.setItem('UserefCode', refCode)

      this.attachMode()
    })
  }

 

  ngOnInit(): void {
    this.getUser();
  }

  attachMode(): void {
    this.observer.observe(['(max-width: 800px']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'push';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side'
        this.sidenav.open()
      }
    })
  }


}
