import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DEFAULT_INTERRUPTSOURCES, Idle } from "@ng-idle/core";
import { ModifyElementService } from './services/modify-element.service';

const helper = new JwtHelperService();
const TOKEN_KEY = 'access_token';
// tslint:disable-next-line: no-non-null-assertion
const jwt = localStorage.getItem(TOKEN_KEY)!;
const isExpired = helper.isTokenExpired(jwt);
const user = helper.decodeToken(jwt)

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'Fortarium';
  private numberOfSeconds: number = 5;
  private time_to_logout = 600;

  constructor(
    private _idle: Idle,
    private _snackbar: MatSnackBar,
    private router: Router,
    private renderer: Renderer2,
    private modifiersService: ModifyElementService
  ) { }


  check_if_user() {
    if (jwt) {
      if (!isExpired) {
        this._idle.setIdle(this.numberOfSeconds);
        this._idle.setTimeout(this.time_to_logout);
        this._idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

        this._idle.onTimeout.subscribe(() => {
          localStorage.removeItem(TOKEN_KEY)
          let snackBarRef = this._snackbar.open(` ${user.firstName} You have been logged out due to inactivity`, 'Log Back In', {
            duration: 5000
          })
          snackBarRef.afterDismissed().subscribe(info => {
            if (info.dismissedByAction === true) {
              window.location.href = "/users/login";
            }
            else {
              if (this.router.url.includes('/clientarea/')) {
                window.location.href = "/"
              } else {
                location.reload()
              }
            }
          });
        });
        this._idle.watch()
      }
    }

  }

  modifyElementText() {
    const element = this.modifiersService.modifyElementText();

    setTimeout(() => {
      this.renderer.addClass(element, 'fade-out');
    }, 1000);

    setTimeout(() => {
      this.renderer.addClass(element, 'hidden');
      console.log(element)
    }, 4000);
  }
  ngOnInit() {
    this.check_if_user()
  }

  ngAfterViewInit() {
    this.modifyElementText()
  }
}
