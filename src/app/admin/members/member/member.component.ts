import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService, Users } from 'src/app/services/admin.service';
import { Investments } from '../../pending/pending.component';



@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {


  public confirimedInvestments: Investments[] = [];
  public investments: Investments[] = [];
  public users!: Users[];
  public filteredInvestment = [];
  public withdrawedInvestment: Investments[] = [];
  public confrim!: string;
  public refs: any;
  public UserInfo!: Users;

  public totalInvestments!: number;
  public totalPendingWithdrawal!: number;
  public totalPendingDeposit!: number;
  public totalWithdrawal!: number;


  constructor(private Admin: AdminService, @Inject(MAT_DIALOG_DATA) public data: any) { }


  getInvestments(): any {
    this.Admin.getUserInvestment(this.data.User._id).subscribe(res => {
      this.investments = res;
      console.log(res);
      this.getUserInvestments();
    });
  }

  removeVest(vestId: string): any {
    this.Admin.removeInvest(vestId).subscribe(res => {
      window.alert(res);
      window.location.reload();
    });
  }

  updateVest(vestID: string, confrim: string): any {
    const Confrim = {
      confirmation: confrim
    };
    this.Admin.updateVetsment(vestID, Confrim).subscribe(res => {
      console.log(res);
      window.location.reload()
    });
  }

 

  getUserInvestments(): any {
    this.withdrawedInvestment = this.investments.filter(res => {
      this.getConfiremedInvestments();
      this.getTotalInvestments();
      this.getTotalPeningWithdraw();
      this.getTotalPendingDeposit();
      this.getTotalWithdrawal();
      return res.confirmation === 'withdraw';
    });

  }

  getConfiremedInvestments(): any {
    this.confirimedInvestments = this.investments.filter(res => {

      return res.confirmation === 'confirmed';
    });
  }

  getRefs(): any {
    console.log(this.data.Users);
    this.refs = this.data.Users.filter((res: { refererId: any; }) => {
      console.log(res.refererId, this.data.User.refCode);
      return res.refererId === this.data.User.refCode;
    });
    console.log(this.refs);
  }

  getTotalInvestments(): any {
    return this.totalInvestments = this.investments.reduce((a, b) => a + (b.amount || 0), 0);
  }

  getTotalPeningWithdraw(): any {
    return this.totalPendingWithdrawal = this.investments.filter(res =>
      res.confirmation === 'pending withdraw').reduce((a, b) => a + (b.amount || 0), 0);
  }

  getTotalPendingDeposit(): any {
    return this.totalPendingDeposit = this.investments.filter(res =>
      res.confirmation === 'pending').reduce((a, b) => a + (b.amount || 0), 0);
  }

  getTotalWithdrawal(): any {
    return this.totalWithdrawal = this.investments.filter(res =>
      res.confirmation === 'withdraw').reduce((a, b) => a + (b.amount || 0), 0);
  }



  getUser() {
    console.log(this.data.User)
    this.UserInfo = this.data.User
  }


  ngOnInit(): void {
    this.getUser()
    this.getInvestments();
    this.getRefs();
  }

}
