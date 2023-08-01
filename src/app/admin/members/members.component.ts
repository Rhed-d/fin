import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/services/admin.service';
import { MemberComponent } from './member/member.component';



export interface Users {
  createdOn: number;
  email: string;
  firstName: string;
  lastName: string;
  _id: string;
  refCode: string;
  refererId: string;
}



@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {



  public users: Users[] = [];

  constructor(private Admin: AdminService, public dialog: MatDialog) { }

  remove(userId: string): any {
    this.Admin.removeUser(userId).subscribe(res => {
      window.alert(res);
      window.location.reload();
    });
  }

  getUsers(): void {
    this.Admin.getUsers().subscribe(res => {
      this.users = res;
    });
  }

  getUser(user: Users): any {
    const dialogRef = this.dialog.open(MemberComponent, {
      width: '100%',
      height: '90%',
      data: { User: user, Users: this.users }
    });
  }



  filterInvestment(vestId: string): void {

  }

  ngOnInit(): void {
    this.getUsers();
  }



}
