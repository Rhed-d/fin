import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminService, Investments } from 'src/app/services/admin.service';




@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent implements OnInit {

  public investments: Investments[] = [];
  public totalInvestments!: number;
  public totalPendingWithdrawal!: number;
  public totalPendingDeposit!: number;
  public totalWithdrawal!: number;
  public walletAddress: any
  public info: any
  updateWalletAddress!: FormGroup

  constructor(public Admin: AdminService) {
  }

  updateAdress() {
    this.Admin.updateAdress(
    this.updateWalletAddress.value, this.info[0]._id).subscribe(res => {
      window.alert(`Updated`)
      window.location.reload()
    })
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

  getInvestments(): void {
    this.Admin.getInvestment().subscribe(
      res => {
        this.investments = res;
        this.getTotalInvestments();
        this.getTotalPeningWithdraw();
        this.getTotalPendingDeposit();
        this.getTotalWithdrawal();
      }
    );
  }
  ngOnInit(): void {
    this.getInvestments();
  }
}
