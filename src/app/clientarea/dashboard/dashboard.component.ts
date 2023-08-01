import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import * as moment from 'moment';
import { balanceCard } from './dashboarddata';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MatDialog } from '@angular/material/dialog';


const helper = new JwtHelperService();
const TOKEN_KEY = 'access_token';
const refCode_LS = 'UserefCode'
// tslint:disable-next-line: no-non-null-assertion
const jwt = localStorage.getItem(TOKEN_KEY)!;
const refCode = localStorage.getItem(refCode_LS)!;
const userInfo = helper.decodeToken(jwt);

interface CUR {
  _id: string;
  value: string;
  viewValue: string;
  amount: number;
  coinPrice: number;
  totalValue: number;
}

interface withdawalPart {
  _id: string
  amount: number
  confirmation: string
  createdOn: string
  investmentId: string
  wallet: string
}

interface Investemt {
  _id: string;
  packageType: string;
  createdOn: string;
  amount: number;
  balance: number;
  increament: number;
  duration: number;
  Current: number;
  currentBalance: number;
  confirmation: string;
  interval: string;
}

interface Refs {
  firstName: string;
  lastName: string;
  createdOn: number;
}

interface User {
  firstName: string;
  lastName: string;
  createdOn: number;
  refCode: string;
  bonus: number
}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})



export class DashboardComponent implements OnInit {

  TotalInvestmentCount = 0.00;
  TotalInvestemntValue = 0.000;
  TotalDepositeValue = 0.00;
  TotalWithdrawalValue = 0.00;
  partWithdawlsValue = 0.00
  TotalRefValue = 0.00;
  ActualWithdral = 0.00;
  fiatPayType!: string;
  currentRate = 1;

  balanceCash: any;
  amountCash: any;
  UserInfo: User = userInfo;
  userRef!: number;
  bonus!: number;
  refCodeIN = refCode


  investments: Investemt[] = [];
  confirmedInvestments: Investemt[] = [];
  pendingInvestments: Investemt[] = [];
  partWithdawls: withdawalPart[] = []


  referals: Refs[] = [];

  ref_count: number = 0;
  refCode = '';

  constructor(
    private profile_service: ProfileService,
    private dialog: MatDialog
  ) { }




  logout(): any {
    localStorage.removeItem(TOKEN_KEY);
    window.location.reload();
  }



  getDurration(dt2: any, dt1: any, interval: number): any {
    let diff = (dt2.getTime() - dt1.getTime());
    diff /= interval * 3600000;
    return Math.abs(Math.floor(diff));
  }

  getUserRef() {
    this.profile_service.getUserInfor().subscribe(res => {
      this.userRef = res.refBonus
      this.bonus = res.bonus
    })
  }


  getTotals(): any {
    this.TotalInvestemntValue = this.confirmedInvestments.reduce((acc, coins) => acc + coins.balance, 0);
    this.TotalInvestmentCount = this.confirmedInvestments.length;
    this.TotalDepositeValue = this.confirmedInvestments.reduce((acc, coins) => acc + coins.amount, 0);
    this.TotalRefValue = this.referals.length * (this.TotalDepositeValue * 0.01);
    this.TotalWithdrawalValue = this.confirmedInvestments.reduce((acc, coins) => acc + coins.currentBalance, 0);
    this.partWithdawlsValue = this.partWithdawls.reduce((a, b) => a + b.amount, 0)

    this.ActualWithdral = (this.partWithdawlsValue + this.TotalWithdrawalValue);
  }

  getPartWithdarwals(): void {
    this.profile_service.getUserPartWithdarwal().subscribe(res => {
 
      this.partWithdawls = res
      console.log(this.partWithdawls)
      this.getTotals()
    })
  }





  getInvestemtns(): void {
    // tslint:disable-next-line: deprecation
    this.profile_service.getUserInvestemsts().subscribe(
      res => {
        this.investments = res;
        for (let investment of this.investments) {
          if (investment.confirmation === 'confirmed') {
            this.confirmedInvestments.push(investment)
          }
          else if (investment.confirmation === 'pending') {
            this.pendingInvestments.push(investment)
          }
        }
        this.confirmedInvestments.map(results => {
          const interval = this.getInterval(results.interval)
          const Duration = this.getDurration(new Date(Date.now()), new Date(results.createdOn), interval);
          results.duration = Duration;
          results.Current = Date.now();
          results.balance = results.amount * Duration * (results.increament / 100);
        });
        this.getPartWithdarwals()

      }
    );
  }

  getInterval(interval: string): number {
    if (interval === 'days') {
      return 24
    } else if (interval === 'weeks') {
      return 24 * 5
    } else if (interval === 'months') {
      return 24 * 28
    } else if (interval === 'years') {
      return 24 * 360
    }
    else return 0
  }

  updateCurrencyType() {
    this.profile_service.fiatPayType.subscribe(
      res => {
        this.fiatPayType = res
      }
    )

    let newCur = localStorage.getItem('fiatPayType')
    if (newCur) {
      this.fiatPayType = newCur
    }

    this.profile_service.currentRate.subscribe(
      res => {
        this.currentRate = res
        this.getTotals()
      }
    )
  }


  ngOnInit(): void {
    this.getInvestemtns();
    this.updateCurrencyType();
    this.getUserRef()
  }
}
