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
}

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.scss']
})
export class PendingComponent implements OnInit {

  investments: Investments[] = [];

  pendingInvestments: Investments[] = [];

  withdrawedInvestment: Investments[] = [];

  public confrim!: string;

  constructor(public Admin: AdminService) { }


  getInvestments(): void {
    this.Admin.getInvestment().subscribe(
      res => {
        this.investments = res;
        this.getUserInvestments();
      }
    );
  }

   getUserInvestments(): any {
    this.pendingInvestments = this.investments.filter(res => {
      return res.confirmation === 'pending';
    });


    this.withdrawedInvestment = this.investments.filter(res => {
      return res.confirmation === 'pending withdraw';
    });
  }

  updateVest(vestID: string, confrim: string): any {
    const Confrim = {
      confirmation: confrim
    };
    this.Admin.updateVetsment(vestID, Confrim).subscribe(res => {
      window.location.reload()
      console.log(res);
    });
  }

  removeVest(vestId: string): any {
    this.Admin.removeInvest(vestId).subscribe(res => {
      window.alert(res);
      window.location.reload();
    });
  }

  ngOnInit(): void {
    this.getInvestments();

  }

}
