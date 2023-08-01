import { Component } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';

interface Investment {
  _id: string;
  packageType: string;
  createdOn: string;
  amount: number;
  balance: number;
  increament: number;
  type: string;
  duration: number;
  Current: number;
  coinName: string;
  coinImg: string;
  InvestmentType: string;
  confirmation: string;
  interval: string;
  partWithdrawal: number;
  withdarwable: string
}

@Component({
  selector: 'app-investment-history',
  templateUrl: './investment-history.component.html',
  styleUrls: ['./investment-history.component.scss']
})
export class InvestmentHistoryComponent {
  constructor(private profile_service: ProfileService) { }


  TotalInvestemntValue = 0

  TotalInvestmentCount = 0


  TotalPendingCount = 0

  TotalDepositeValue = 0

  fiatPayType!: string


  is_withdawal_disabled = true

  Timereminaing: any



  investments: Investment[] = [];
  pendingInvestments: Investment[] = []
  confirmedInvestments: Investment[] = []

  getDurration(dt2: any, dt1: any, interval: number): any {
    let diff = (dt2.getTime() - dt1.getTime());
    diff /= interval * 3600000;
    return Math.abs(Math.floor(diff));
  }


  getTotals(): any {
    this.TotalInvestemntValue = this.confirmedInvestments.reduce((acc, coins) => acc + coins.balance, 0);
    this.TotalInvestmentCount = this.confirmedInvestments.length;
    this.TotalPendingCount = this.pendingInvestments.length;
    this.TotalDepositeValue = this.confirmedInvestments.reduce((acc, coins) => acc + coins.amount, 0);
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
          const interval = this.getInterval(results.interval, results._id)
          const Duration = this.getDurration(new Date(Date.now()), new Date(results.createdOn), interval);
          results.duration = Duration;
          results.Current = Date.now();
          results.balance = (results.amount * Duration * (results.increament / 100)) - results.partWithdrawal;
          if (results.withdarwable) {
            this.is_withdawal_disabled = false
          }
        });
        this.getTotals()

      }
    );
  }

  change_miliseconds_to_days(miliseconds: number) {
    let milliSecs = Math.round(miliseconds / (1000 * 60 * 60 * 24))
    return milliSecs
  }

  getRemainingTime(interval: string, vestId: string) {
    let inter
    if (interval === 'days') {
      inter = 0
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

  }

  getInterval(interval: string,  vestId: string): number {
    this.getRemainingTime(interval, vestId)
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



  ngOnInit(): void {
    this.getInvestemtns();
  }

}
