import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

declare interface current_fiat_values {
  USD: number,
  AUD: number,
  GBP: number,
  EUR: number,
  CNY: number

}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private url = environment.url;
  walletUrl: any;

  file!: string | Blob
  formData = new FormData()
  fiatPayType = new BehaviorSubject('EUR')
  currentRate = new BehaviorSubject(0)
  holder: any;



  current_fiat_values = [
    {
      curName: 'USD',
      curVale: 1,
    },
    {
      curName: 'AUD',
      curVale: 1,
    },
    {
      curName: 'GBP',
      curVale: 1,
    },
    {
      curName: 'EUR',
      curVale: 1,
    },
    {
      curName: 'CNY',
      curVale: 1,
    }
  ]
  constructor(private http: HttpClient) { }

  ChageBaseCurrency(cur: string) {
    this.fiatPayType.next(cur)
    localStorage.setItem('fiatPayType', cur)

    this.current_fiat_values.map(res => {
      if (res.curName == cur) {
        this.currentRate.next(res.curVale)
      }
    })
  }


  getUserInfor(): Observable<any> {
    return this.http.get(`${this.url}users/profile`);
  }


  toFormData(formValue: any) {
    this.formData = new FormData()
    for (const key of Object.keys(formValue)) {
      const value = formValue[key];
      this.formData.append(key, value);
    }
    this.formData.append('images', this.file)
    console.log(this.formData.get('images'))
    return this.formData
  }




  updateUserInfo(userInfo: any) {
    return this.http.patch(`${this.url}users/findOne`, userInfo)
  }

  getUserInvestemsts(): Observable<any> {
    return this.http.get(`${this.url}users/investment`)
  }

  getUserWithdrawals(): Observable<any> {
    return this.http.get(`${this.url}users/investment/withdrawal`)
  }



  getReferals(refId: string): Observable<any> {
    return this.http.get(`${this.url}users/profile/ref/${refId}`);
  }

  invest(coninfo: any): Observable<any> {
    return this.http.post(`${this.url}users/investment`, coninfo);
  }

  directInvest(coninfo: { packageType: any; amount: number; increament: number; coinName: string; })
    : Observable<any> {
    return this.http.post(`${this.url}crypto-investments/direct`, coninfo);
  }


  updateInvestment(id: string, updates: any): Observable<any> {
    return this.http.patch(`${this.url}users/investment/${id}`, updates)
  }

  withdraw(change: any): Observable<any> {
    return this.http.post(`${this.url}users/withdraw`, change);
  }

  delete(investmentId: string): Observable<any> {
    return this.http.delete(`${this.url}users/investment/${investmentId}`);
  }

  getwithdrdawPart(): Observable<any> {
    return this.http.get(`${this.url}users/withdraw`)
  }

  getUserPartWithdarwal(): Observable<any> {
    return this.http.get(`${this.url}users/withdraw/part`)
  }

  delete_part_withdrawl(id: string): Observable<any> {
    return this.http.delete(`${this.url}users/investment/part/${id}`)
  }

}
