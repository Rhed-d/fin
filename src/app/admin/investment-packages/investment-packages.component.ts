import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';


interface PageageDTO {
  _id: string,
  InvestmentType: string,
  packageTypes: string,
  percentages: Number,
  duration: number,
  minValue: number,
  maxValue: number,
  refBonus: number
}

@Component({
  selector: 'app-investment-packages',
  templateUrl: './investment-packages.component.html',
  styleUrls: ['./investment-packages.component.scss']
})
export class InvestmentPackagesComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private adminService: AdminService) { }


  Package!: FormGroup;
  packages: PageageDTO[] = []
  spinning = false
  update = false
  updateId = ''

  @ViewChild('topPage', { read: ElementRef, static: true }) topPage!: ElementRef

  getPackagesForm(): void {
    this.Package = this.formBuilder.group({
      InvestmentType: ['', [Validators.required]],
      packageTypes: ['', [Validators.required]],
      percentages: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      minValue: ['', [Validators.required]],
      maxValue: ['', [Validators.required]],
      refBonus: ['', [Validators.required]],
    });
  }

  UpdatePackagesForm(count: number): void {
    this.updateId = this.packages[count]._id
    this.Package = this.formBuilder.group({
      packageTypes: [this.packages[count].packageTypes, [Validators.required]],
      InvestmentType: [this.packages[count].InvestmentType, [Validators.required]],
      percentages: [this.packages[count].percentages, [Validators.required]],
      duration: [this.packages[count].duration, [Validators.required]],
      minValue: [this.packages[count].minValue, [Validators.required]],
      maxValue: [this.packages[count].maxValue, [Validators.required]],
      refBonus: [this.packages[count].refBonus, [Validators.required]],
    });
  }



  addPackage(): void {
    this.spinning = true
    this.adminService.postInvestmentPackage(this.Package.value).subscribe(
      res => {
        this.packages.push(res)
        this.spinning = false
      }
    )
  }

  udatePackage(): void {
    this.spinning = true
    this.adminService.UdateInvestmentPackage(this.Package.value, this.updateId).subscribe(
      res => {
        this.packages.push(res)
        this.spinning = false
        window.location.reload()
      }
    )
  }

  deletePackage(id: string): void {
    this.adminService.daleteInvestmentPackage(id).subscribe(
      res => {
        this.spinning = false
        window.location.reload()
      }
    )
  }

  editPackage(i: number): void {
    this.update = true
    this.topPage.nativeElement.scrollIntoView({ behavior: 'smooth' })
    this.UpdatePackagesForm(i)
  }

  getPackages(): void {
    this.adminService.getInvestmentPackage().subscribe(
      res => {
        this.packages = res
      }
    )
  }

  ngOnInit(): void {
    this.getPackagesForm()
    this.getPackages()
  }

}
