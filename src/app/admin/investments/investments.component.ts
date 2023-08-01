import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

export interface Investments {
  _id: string;
  amount: number;
  coinName: string;
  confirmation: string;
  createdOn: number;
  currentBalance: number;
  email: string;
  increament: number;
  packageType: string;
  user: string;
  wallet: string;
  withdarwable: boolean;
  withdrawalDate: string
  days_remaining: number
}

@Component({
  selector: 'app-investments',
  templateUrl: './investments.component.html',
  styleUrls: ['./investments.component.scss']
})
export class InvestmentsComponent implements OnInit {

  checkingInvestment: Investments[] = []

  investments: Investments[] = [];

  Timereminaing: any

  constructor(public Admin: AdminService) { }

 
  change_miliseconds_to_days(miliseconds: number) {
    let milliSecs = Math.round(miliseconds/ (1000 * 60 * 60 *24))
    return milliSecs
  }

  getRemainingTime(interval: string, withdarwalDate: string | number | Date, vestId: string) {
    let inter
    if (interval === 'days') {
      inter = 1
    } else if (interval === 'weeks') {
      inter = 7
    } else if (interval === 'months') {
      inter = 30
    } else if (interval === 'years') {
      inter = 365
    }
    else {
      inter = 0
    }
    let Dday = new Date(withdarwalDate)
      this.Timereminaing = (Dday.getTime()  - new Date(Date.now()).getTime()) / (1000 * 60 * 60 *24)
    if (this.Timereminaing <= 0) {
      this.Timereminaing = new Date(new Date(Date.now()).getTime() + (inter * 24 * 60 * 60 * 1000))
      console.log(vestId)
      // this.Admin.updateVetsment(vestId, {time_to_withdrawal: this.Timereminaing}).subscribe()
    } 
    
  }

  getInterval(interval: string, withdwaldate: Date, vestId: string): number {
    // this.getRemainingTime(interval, withdwaldate, vestId)
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

  getDurration(dt2: any, dt1: any, interval: number): any {
    let diff = (dt2.getTime() - dt1.getTime());
    diff /= interval * 3600000;
    return Math.abs(Math.floor(diff));
  }


  getUserInvestments(): any {
    this.Admin.getInvestment().subscribe(
      res => {
        res.map((results: any) => {
          const interval = this.getInterval(results.interval, new Date(results.time_to_withdrawal), results._id)
          const Duration = this.getDurration(new Date(Date.now()), new Date(results.createdOn), interval);
          results.duration = Duration;
          results.days_remaining = this.change_miliseconds_to_days(new Date(results.time_to_withdrawal).getTime() - new Date(Date.now()).getTime())
          results.Current = Date.now();
          results.currentBalance = (results.amount * Duration * (results.increament / 100)) - results.partWithdrawal;
        })
        this.checkingInvestment = res
        for (let investment of this.checkingInvestment) {
          if (investment.confirmation === 'confirmed') {
            this.investments.push(investment)
          }
        }
      }
    );
  }

  updateVest(vestID: string, confrim: string): any {
    const Confrim = {
      confirmation: confrim
    };
    this.Admin.updateVetsment(vestID, Confrim).subscribe(res => {
      window.location.reload()
    });
  }

  make_wiithdrawable(vestID: string, withdarwable: boolean) {
    let Confrim: { withdarwable: boolean; }
    if (withdarwable) {
      Confrim = {
        withdarwable: false
      }
    } else {
      Confrim = {
        withdarwable: true
      }
    }

    this.Admin.updateVetsment(vestID, Confrim).subscribe(res => {
      window.alert('Success')
      window.location.reload();
    });
  }

  removeVest(vestId: string): any {
    this.Admin.removeInvest(vestId).subscribe(res => {
      window.alert(res);
      window.location.reload();
    });
  }

  ngOnInit(): void {
    this.getUserInvestments();
  }

}
