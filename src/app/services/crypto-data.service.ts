import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CryptoDataService {

  result: any;
  apiBaseUrl = environment.url;
  constructor(
    private http: HttpClient
  ) { }



  getPrices(): Observable<any> {
    return this.http.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,USDC,LTC,DAI,BCH&tsyms=USD')
      .pipe(
        map(result =>
          this.result = result
        )
      );
  }

  getMultiplePrices(): Observable<any> {

    return this.http.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,USDC,LTC,DAI,BCH&tsyms=USD')
      .pipe(
        map(result =>
          console.log(result)
        )
      );
  }

  singlePrice(crypto: any, fiat: any): Observable<any> {
    return this.http.get(`https://min-api.cryptocompare.com/data/price?fsym=${crypto}&tsyms=${fiat}`)
  }


  paycrypto(credentials: any): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}crypto-pay/${credentials}`);
  }
}
