import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

export interface Users {
  createdOn: number;
  email: string;
  firstName: string;
  lastName: string;
  _id: string;
  refCode: string;
  refererId: string;
}

export interface recipiants {
  email: string,
  firstName: string,
  i: number
}

declare interface Mails {
  Header: string
  body: string
  recipiants: [{
    email: string
  }]
  senderName: string
  subject: string
}

@Component({
  selector: 'app-create-payment',
  templateUrl: './create-payment.component.html',
  styleUrls: ['./create-payment.component.scss']
})


export class CreatePaymentComponent implements OnInit {



  public showError = false;
  public users: Users[] = [];
  public recipiants: recipiants[] = []
  public mails: Mails[] = []

  constructor(public Admin: AdminService) { }




  sendMessage(Header: any, senderName: string, subject: any, body: any): any {
    const info = {
      Header,
      senderName,
      subject,
      body,
      recipiants: this.recipiants
    };
    this.Admin.generateMail(info).subscribe(res => {
      window.alert('Success');
      window.location.reload()
    });
  }


  getUsers(): void {
    this.Admin.getUsers().subscribe(res => {
      this.users = res;
    });
  }

  addRecipiant(email: string, name: string, index: number) {
    const userInfo = {
      email: email,
      firstName: name,
      i: index
    }
    const indexToDelete = this.recipiants.findIndex(res => res.i === userInfo.i)
    if (indexToDelete > -1) {
      this.recipiants.splice(indexToDelete, 1)
    }
    else {
      this.recipiants.push(userInfo)
    }
    console.log(this.recipiants)
  }


  getMail() {
    this.Admin.getMail().subscribe(res => {
      console.log(res)
      this.mails = res
    })
  }

  ngOnInit(): void {
    this.getUsers()
    this.getMail()
  }

}
