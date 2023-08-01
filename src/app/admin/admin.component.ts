import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AdminService } from 'src/app/services/admin.service';
import { Investments } from './pending/pending.component';
const TOKEN_KEY = 'access_token';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit {
  public investments: Investments[] = [];
  public totalInvestments!: number;
  public totalPendingWithdrawal!: number;
  public totalPendingDeposit: number = 0;
  public totalWithdrawal!: number;
  public walletAddress: any
  public info: any


  constructor(private Admin: AdminService, private observer: BreakpointObserver) { }

  @ViewChild(MatSidenav) sidenav!: MatSidenav


  logout(): any {
    localStorage.removeItem(TOKEN_KEY);
    window.location.reload();
  }


  getUsers(): void {
    this.Admin.getUsers().subscribe(res => {
      this.Admin.users = res;
    });
  }



  getTotalInvestments(): any {
    this.totalInvestments = this.investments.filter(res =>
      res.confirmation == 'confirmed').reduce((a, b) => a + (b.amount || 0), 0);
  }

  getTotalPeningWithdraw(): any {
    const totalPendingWithdrawal = this.investments.filter(res =>
      res.confirmation === 'pending withdraw').reduce((a, b) => a + (b.currentBalance || 0), 0);

    const totalPendingWithdrawalAmount = this.investments.filter(res =>
      res.confirmation === 'pending withdraw').reduce((a, b) => a + (b.amount || 0), 0);
    this.totalPendingWithdrawal = totalPendingWithdrawalAmount + totalPendingWithdrawal
  }

  getTotalPendingDeposit(): any {
    this.totalPendingDeposit = this.investments.filter(res =>
      res.confirmation === 'pending').reduce((a, b) => a + (b.amount || 0), 0);
  }

  getTotalWithdrawal(): any {
    this.totalWithdrawal = this.investments.filter(res =>
      res.confirmation === 'withdraw').reduce((a, b) => a + (b.currentBalance || 0), 0);
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
    this.getUsers();
  }

  ngAfterViewInit(): void {
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
