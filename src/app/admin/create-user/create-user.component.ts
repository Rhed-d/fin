import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { ProfileService } from 'src/app/services/profile.service';




export interface Investments {
  _id: string
  amount: number
  name: string
  confirmation: string
  email: string
  createdOn: string
  investmentId: string
  user: string
  wallet: string
}


const TOKEN_KEY = 'access_token';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  investments: Investments[] = [];

  constructor(public Admin: AdminService, public User: ProfileService) { }

  getUserInvestments(): any {
    this.User.getwithdrdawPart().subscribe(
      res => {
        console.log(res)
        this.investments = res;
      }
    );
  }

  updateVest(vest: any): any {

    let newInfo = {
      _id: vest._id,
      amount: vest.amount,
      name: vest.name,
      confirmation: 'confirmed',
      email: vest.email,
      createdOn: vest.createdOn,
      investmentId: vest.investmentId,
      user: vest.user,
      wallet: vest.wallet
    }
    this.Admin.postMail(newInfo).subscribe(res => {
      window.alert('Success')
      window.location.reload()
    })
  }

  removeVest(vestId: string): any {
    this.Admin.removePartInvestment(vestId).subscribe(res => {
      window.alert(res);
      window.location.reload();
    });
  }

  ngOnInit(): void {
    this.getUserInvestments();
  }

}
