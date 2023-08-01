import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from 'src/app/services/profile.service';




export interface userInfo {
  _id: string;
  profilePicture: {
    url: string,
    public_id: string
  };
  SSN: string;
  email: string;
  firstName: string;
  lastName: string;
  refCode: string;
  walletAddress: string
  phoneNumber: string

}


@Component({
  selector: 'app-acc-settings',
  templateUrl: './acc-settings.component.html',
  styleUrls: ['./acc-settings.component.scss']
})
export class AccSettingsComponent implements OnInit {

  Userinfo!: userInfo;
  UserForm!: FormGroup;
  first_name_initial = ''
  second_name_initial = ''

  constructor(private profile_Service: ProfileService, private fromBuilder: FormBuilder) { }


  onImageChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      console.log(event.target.files[0])
      this.profile_Service.file = event.target.files[0]
    }
    this.UpdateProfile()
  }

  UpdateProfile() {
    this.profile_Service.updateUserInfo(this.profile_Service.toFormData(this.UserForm.value)).subscribe(
      res => {
        window.alert('Updated')
        window.location.reload()
      }
    )
  }

  UpdateProfilePic() {

  }


  getUserForm() {
    this.UserForm = this.fromBuilder.group({
      email: [this.Userinfo.email, [Validators.required, Validators.email]],
      firstName: [this.Userinfo.firstName, [Validators.required]],
      lastName: [this.Userinfo.lastName, [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      walletAddress: [this.Userinfo.walletAddress, [Validators.required]],
      phoneNumber: [this.Userinfo.phoneNumber]
    })
  }

  getPC(): void {

    let first_name_array = this.Userinfo.firstName.split("")
    let second_name_array = this.Userinfo.lastName.split("")

    this.second_name_initial = second_name_array[0]
    this.first_name_initial = first_name_array[0]
  }

  /**
   * Geting users profile
   */
  getUserProfile(): void {
    // tslint:disable-next-line: deprecation
    this.profile_Service.getUserInfor().subscribe(
      res => {
        this.Userinfo = res;
        this.getUserForm();
        this.getPC()
      }
    );
  }

  ngOnInit(): void {
    this.getUserProfile();
  }

}
