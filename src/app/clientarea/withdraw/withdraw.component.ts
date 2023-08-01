import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ProfileService } from 'src/app/services/profile.service';

interface Investment {
  _id: string;
  packageType: string;
  InvestmentType: string;
  createdOn: string;
  amount: number;
  balance: number;
  increament: number;
  duration: number;
  currentBalance: number;
  coinName: string;
  coinImg: string;
  userId: string;
  confirmation: string;
  interval: string;
  Current: any;
  partWithdrawal: number
}

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss']
})
export class WithdrawComponent implements OnInit {

  investments: Investment[] = [];
  confirmedInvestments: Investment[] = [];
  selectedInvestment: Investment = {
    _id: '',
    packageType: '',
    InvestmentType: '',
    createdOn: '',
    amount: 0,
    balance: 0,
    increament: 0,
    duration: 0,
    currentBalance: 0,
    coinName: '',
    coinImg: '',
    userId: '',
    confirmation: '',
    interval: '',
    Current: undefined,
    partWithdrawal: 0
  }
  wallet: string = ''
  id: string = ''
  amount: number = 0
  isButtonDisabled = true
  error_message = ''

  constructor(private profile_service: ProfileService, private adminService: AdminService, private _snackBar: MatSnackBar, private router: Router) { }

  getDurration(dt2: any, dt1: any, interval: number): any {
    let diff = (dt2.getTime() - dt1.getTime());
    diff /= interval * 3600000;
    return Math.abs(Math.floor(diff));
  }

  getInterval(interval: string, vestId: string): number {
    if (interval === 'days') {
      return 24
    } else if (interval === 'weeks') {
      return 24 * 7
    } else if (interval === 'months') {
      return 24 * 30
    } else if (interval === 'years') {
      return 24 * 365
    }
    else return 0
  }

  getInvestments(): void {
    // tslint:disable-next-line: deprecation
    this.profile_service.getUserInvestemsts().subscribe(
      res => {
        this.investments = res;
        for (let investment of this.investments) {
          if (investment.confirmation === 'confirmed') {
           
            this.confirmedInvestments.push(investment)
          }
        }
        this.confirmedInvestments.map(results => {
          const interval = this.getInterval(results.interval, results._id)
          const Duration = this.getDurration(new Date(Date.now()), new Date(results.createdOn), interval);
          results.duration = Duration;
          results.Current = Date.now();
          results.balance = (results.amount * Duration * (results.increament / 100)) - results.partWithdrawal;
        });
      }
    );
  }

  updatewithdrawal(): void {
    const withdrawData = {
      investmentId: this.id,
      amount: this.amount,
      wallet: this.wallet,
      confirmation: false
    }
    this.profile_service.updateInvestment(this.id, { partWithdrawal: this.amount }).subscribe(res => {
      this.profile_service.withdraw(withdrawData).subscribe(res => {
        this.openSnackBar()
      })
    })

  }

  getCurrentInvestment() {
    this.selectedInvestment = this.confirmedInvestments.find(res => {
      return res._id === this.id
    }) as Investment
  }

  checkBalance(): void {
    if (this.amount > 0 && this.amount < this.selectedInvestment.balance) {
      this.error_message = ''
      this.isButtonDisabled = false
    } else {
      this.error_message = `Your withdrawal must be between $1 and $${this.selectedInvestment.balance}`
      this.isButtonDisabled = true
    }
  }

  openSnackBar() {
    let snackBarRef = this._snackBar.open('Your withdrawal is being processed', 'Ok');

    snackBarRef.onAction().subscribe(() => {
      this.router.navigate(['/clientarea/dashboard'])
    });
  }


  ngOnInit(): void {
    this.getInvestments()
  }
}
