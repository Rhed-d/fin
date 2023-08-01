import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenucolorService {


  constructor() { }
  addBackground = new BehaviorSubject(false);

  setTrueboolianVlaue(): any {
    this.addBackground.next(true);
  }

  setFalseboolianVlaue(): any {
    this.addBackground.next(false);
  }


}
