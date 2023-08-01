import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ProfileService } from 'src/app/services/profile.service';

interface coins {
  Network: string
  WalletAddress: string
  coinName: string
  id: string
  icon: string
}

export interface packagesType {
  InvestmentType: string;
  packageType: string;
  percentages: number;
  duration: number;
  minValue: number;
  maxValue: number;
  refBonu: number;
  remark: string;

}


@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.scss']
})
export class TypeComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute, private _formBuilder: FormBuilder, private adminService: AdminService, private profileService: ProfileService) { }
  paymentType = '';
  amount!: number;
  amount_error = ''
  coin_error = ''
  investmentPackage: any
  buttonIsDisabled = true;
  coins: coins[] = [];
  selectedCoin: coins = {
    Network: '',
    WalletAddress: '',
    coinName: '',
    id: '',
    icon: ''
  }
  assistedTypes = ['Wire Trasfer', 'International bank Transfer'];

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    paymentType: ['', Validators.required],
    amount: [0, Validators.required]
  });



  maketype(type: string) {
    this.firstFormGroup.controls['firstCtrl'].setValue(type)
    this.paymentType = type
  }

  getWalletsAddress() {
    this.adminService.getToken().subscribe(res => {
      this.coins = res
    })
  }

  getSelectedCoin() {
    const coin = this.secondFormGroup.get('paymentType')?.value
    this.selectSaidCoin(coin)
  }

  selectSaidCoin(coin: any) {
    this.selectedCoin = this.coins.find(res => {
      return res.coinName === coin
    }) as coins
  }

  assignNumber() {
    this.amount = this.secondFormGroup.get('amount')?.value as number

    this.toggleErrorsSelect()
  }


  emailText() {
    const email = `mailto:support@financeforte.org?subject=Assisted ${this.investmentPackage.packageTypes} Payment Request&body=Hello, \n I would like to make adeposit of $${this.amount} to fund my ${this.investmentPackage.packageTypes} investment using the wore transfer payment method \n\n Regards \n Your Name`
    return email
  }

  getOneInvestmentPackage(id: string) {
    console.log(id)
    this.adminService.getOneInvestmentPackage(id).subscribe(res => {
      this.investmentPackage = res
    })
  }

  toggleErrorsSelect() {
    if (this.amount <= this.investmentPackage.maxValue && this.amount >= this.investmentPackage.minValue) {
      this.buttonIsDisabled = false;
      this.amount_error = ''
    } else {
      this.buttonIsDisabled = true
      this.amount_error = `The amount should be more than ${this.investmentPackage.minValue} but less than ${this.investmentPackage.maxValue}`
    }

    console.log(this.amount, this.investmentPackage.maxValue, this.investmentPackage.minValue)
  }



  makeInvestment() {
    const investment = {
      increament: this.investmentPackage.percentages,
      packageType: this.investmentPackage.packageTypes,
      type: this.investmentPackage.InvestmentType,
      amount: this.amount
    }
    this.profileService.invest(investment).subscribe()
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(res => {
      console.log(res)
      this.getOneInvestmentPackage(res['type'])
    })
    this.getWalletsAddress()
  }
}
