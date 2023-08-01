import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

export interface packagesType {
  InvestmentType: string;
  packageTypes: string;
  percentages: number;
  duration: number;
  minValue: number;
  maxValue: number;
  refBonu: number;
  remark: string;

}

@Component({
  selector: 'app-invest',
  templateUrl: './invest.component.html',
  styleUrls: ['./invest.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InvestComponent implements OnInit {
  packages: packagesType[] = []
  Agro: packagesType[] = []
  Crypto: packagesType[] = []
  Real_estate: packagesType[] = []
  loaded = false
  constructor(private adminService: AdminService) { }

  getPackages(): void {
    this.adminService.getInvestmentPackage().subscribe(
      res => {
        this.packages = res
        this.arrengePackages()
      }
    )
  }


  arrengePackages() {
    this.packages.map(res => {
      if (res.InvestmentType === 'Agro') {
        this.Agro.push(res)
      }

      if (res.InvestmentType === 'Real Estate') {
        this.Real_estate.push(res)
      }

      if (res.InvestmentType === 'Crypto') {
        this.Crypto.push(res)
      }
    })
    this.loaded = true
  }

  ngOnInit(): void {
    this.getPackages()
  }
}
