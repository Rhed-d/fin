import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';


const TOKEN_KEY = "access_token"
@Component({
  selector: 'app-single-reg-form',
  templateUrl: './single-reg-form.component.html',
  styleUrls: ['./single-reg-form.component.scss']
})
export class SingleRegFormComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

  inputType = 'password';
  regForm!: FormGroup;

  getRegister(): void {
    this.regForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get regValues(): any {
    const controls = 'controls';
    return this.regForm[controls];
  }

  register(): any {
    this.getRefCode();

    this.userService.register(this.regForm.value).subscribe(res => {
      localStorage.removeItem('refCode');
      const token = res.token;
      localStorage.setItem(TOKEN_KEY, token);
      window.location.reload();
    }
    );
  }

  passType(): void {
    if (this.inputType === 'password') {
      this.inputType = 'text';
    }
    else if (this.inputType === 'text') {
      this.inputType = 'password';
    }

  }



  getRefCode(): void {
    if (localStorage.getItem('refCode') !== null) {
      // tslint:disable-next-line: no-non-null-assertion
      const refcode = localStorage.getItem('refCode');
      this.regForm.addControl('refId', new FormControl(refcode));
    }
  }

  ngOnInit(): void {
    this.getRegister();
  }

}
