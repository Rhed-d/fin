import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';


interface Token_wallet {
  _id: string,
  coinName: string,
  WalletAddress: string,
  Network: string
}

@Component({
  selector: 'app-token-wallet',
  templateUrl: './token-wallet.component.html',
  styleUrls: ['./token-wallet.component.scss']
})
export class TokenWalletComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private adminService: AdminService) { }


  token!: FormGroup;
  tokens: Token_wallet[] = []
  spinning = false
  update = false
  updateId = ''

  @ViewChild('topPage', { read: ElementRef, static: true }) topPage!: ElementRef

  getTokenForm(): void {
    this.token = this.formBuilder.group({
      coinName: ['', [Validators.required]],
      WalletAddress: ['', [Validators.required]],
      Network: ['', [Validators.required]]
    });
  }

  UpdateTokenForm(count: number): void {
    this.updateId = this.tokens[count]._id
    this.token = this.formBuilder.group({
      coinName: [this.tokens[count].coinName, [Validators.required]],
      WalletAddress: [this.tokens[count].WalletAddress, [Validators.required]],
      Network: [this.tokens[count].Network, [Validators.required]]
    });
  }



  addPackage(): void {
    this.spinning = true
    this.adminService.postToken(this.token.value).subscribe(
      res => {
        console.log(res)
        this.tokens.push(res)
        this.spinning = false
      }
    )
  }

  udatePackage(): void {
    this.spinning = true
    this.adminService.UdateToken(this.token.value, this.updateId).subscribe(
      res => {
        this.tokens.push(res)
        this.spinning = false
        window.location.reload()
      }
    )
  }

  deleteToken(id: string): void {
    this.adminService.daleteToken(id).subscribe(
      res => {
        this.spinning = false
        window.location.reload()
      }
    )
  }

  editPackage(i: number): void {
    this.update = true
    this.topPage.nativeElement.scrollIntoView({ behavior: 'smooth' })
    this.UpdateTokenForm(i)
  }

  getPackages(): void {
    this.adminService.getToken().subscribe(
      res => {
        console.log(res)
        this.tokens = res
      }
    )
  }

  ngOnInit(): void {
    this.getTokenForm()
    this.getPackages()
  }


}
