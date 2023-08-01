import { Component, OnInit } from '@angular/core';
import { AdminService, Investments, Users } from 'src/app/services/admin.service';


interface PageageDTO {
  _id: string,
  InvestmentType: string,
  packageTypes: string,
  percentages: Number,
  duration: number,
  minValue: number,
  maxVlaue: number,
  refBonus: number
}

@Component({
  selector: 'app-bonus',
  templateUrl: './bonus.component.html',
  styleUrls: ['./bonus.component.scss']
})
export class BonusComponent implements OnInit {


  public UserMail!: string;
  public bonus!: number;
  public User!: Users;
  public showError = false;
  public refbonus!: number
  public newAmount!: number



  increament!: number
  investments!: Investments[]
  packageType: PageageDTO | undefined
  InvestmentType!: string
  type!: string
  amount!: number
  showTabel = false;
  date: any
  interval: any
  packages: PageageDTO[] = []
  investment_type: PageageDTO[] = []

  constructor(public Admin: AdminService) { }

  get_user(email: string): any {
    this.Admin.getUserByMail(email).subscribe(res => {
      if (res) {
        this.showError = false
        this.showTabel = true
        this.User = res
        console.log(res)
        this.getInvestments()
      } else {
        this.showError = true
        this.showTabel = false
      }

    })
  }




  load_account(): any {
    const info = {
      user_id: this.User._id,
      user_firstName: this.User.firstName,
      user_email: this.User.email,
      increament: this.increament,
      packageType: this.packageType?.packageTypes,
      amount: this.amount,
      type: this.type,
      interval: this.interval,
      loadDate: this.date
    }
    console.log(info)
    this.Admin.load_account(info).subscribe(res => {
      console.log(res)
      window.alert('success')
      // window.location.reload()
    })
  }


  getRefBonus() {
    const ref = {
      refBonus: this.refbonus,
      userId: this.User._id

    }
    this.Admin.addRefBonus(ref).subscribe(res => {
      window.alert('Success')
    })
  }

  getBonus() {
    const ref = {
      bonus: this.bonus,
      userId: this.User._id

    }
    this.Admin.addRefBonus(ref).subscribe(res => {
      window.alert('Success')
    })
  }



  getPackages(): void {
    this.Admin.getInvestmentPackage().subscribe(
      res => {
        console.log(res)
        this.packages = res
      }
    )
  }

  getInterval(): void {
    setTimeout(() => {
      this.packageType = this.packages.find(res => {
        console.log(res.percentages, Number(this.increament), 'just shpw')
        return res.percentages === Number(this.increament)
      })
    }, 100);

  }

  updateVest(vestID: string, newAmount: any): any {
    console.log(vestID, newAmount)
    const Confrim = {
      amount: newAmount
    };
    this.Admin.updateVetsment(vestID, Confrim).subscribe(res => {
      console.log(res);
      window.alert('success')
      // window.location.reload()
    });
  }

  getInvestments(): any {
    this.Admin.getUserInvestment(this.User._id).subscribe(res => {
      this.investments = res;
      console.log(res);

    });
  }

  ngOnInit(): void {
    this.getPackages()
  }

}
