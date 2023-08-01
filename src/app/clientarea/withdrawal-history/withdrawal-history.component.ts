import { Component } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';



interface withdawalPart {
  _id: string
  amount: number
  confirmation: string
  createdOn: string
  investmentId: string
  wallet: string
}


interface Investment {
  _id: string;
  packageType: string;
  createdOn: string;
  amount: number;
  balance: number;
  increament: number;
  duration: number;
  currentBalance: number;
  coinName: string;
  coinImg: string;
  userId: string
}

@Component({
  selector: 'app-withdrawal-history',
  templateUrl: './withdrawal-history.component.html',
  styleUrls: ['./withdrawal-history.component.scss']
})
export class WithdrawalHistoryComponent {

  constructor(private profile_service: ProfileService) { }


  TotalCount!: number
  TotalValue!: number
  partTotalValue!: number
  investments: Investment[] = [];
  partWithdawls: withdawalPart[] = [];
  TotalPartCount!: number

  getTotals(): any {
    this.TotalCount = this.investments.length;
    this.TotalPartCount = this.partWithdawls.length
    this.TotalValue = this.investments.reduce((acc, coins) => acc + coins.currentBalance, 0)
    this.partTotalValue = this.partWithdawls.reduce((acc, coins) => acc + coins.amount, 0)
  }


  getPartWithdarwals(): void {
    this.profile_service.getUserPartWithdarwal().subscribe(res => {
      this.partWithdawls = res
      console.log(res)
      this.getTotals()
    })
  }

  delete_part_withdrawal(id: string): void {
    this.profile_service.delete_part_withdrawl(id).subscribe(res => {
      window.alert(res.message)
      window.location.reload()
    })
  }

  deleteThis(vest: any) {
    this.profile_service.delete(vest).subscribe(res => {
      window.alert('Deleted')
      window.location.reload();
    })
  }

  ngOnInit(): void {
    this.getPartWithdarwals()
  }

}
