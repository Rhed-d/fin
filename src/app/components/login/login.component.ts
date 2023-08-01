import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnimationOptions } from 'ngx-lottie';
import { UserService } from 'src/app/services/user.service';

const TOKEN_KEY = 'access_token';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private formBuilder: FormBuilder) { }

  loginForm!: FormGroup;

  options: AnimationOptions = {    
    path: 'https://assets1.lottiefiles.com/private_files/lf30_iraugwwv.json',
    
  }; 

  getLogin(): any {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }

  // tslint:disable-next-line: typedef
  get loginValues() {
    const controls = 'controls';
    return this.loginForm[controls];
  }

  login(): any {
    console.log(this.loginForm.value);
    this.userService.login(this.loginForm.value).subscribe(res => {
      const token = res.token;
      localStorage.setItem(TOKEN_KEY, token);
      window.location.reload();
    });
  }

  get_mail_for_password_change() {
    const input = window.prompt('Input email to get email reset link ')
    console.log({
      email: input
    })
    this.userService.send_reset_link({email: input}).subscribe(res => {
      console.log(res.message)
      window.alert(`Password reset link sent to ${input}`)
    })

  }


  ngOnInit(): void {
    this.getLogin();
  }

}
