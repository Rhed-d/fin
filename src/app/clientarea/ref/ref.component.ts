import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';


interface Refs {
  firstName: string;
  lastName: string;
  createdOn: number;
}

const refCode = localStorage.getItem('UserefCode')!;


@Component({
  selector: 'app-ref',
  templateUrl: './ref.component.html',
  styleUrls: ['./ref.component.scss']
})
export class RefComponent implements OnInit {
  refCode = refCode
  constructor(private profile_service: ProfileService) { }
  user = []
  referals: Refs[] = []
  userRef!: number;

  getRef() {
    this.profile_service.getReferals(refCode).subscribe(res => {
      this.referals = res;
    })
  }

  getUserRef() {
    this.profile_service.getUserInfor().subscribe(res => {
      this.userRef = res.refBonus
    })
  }


  ngOnInit(): void {
    this.getUserRef()
    this.getRef();
  }
}