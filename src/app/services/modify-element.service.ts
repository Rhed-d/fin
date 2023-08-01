import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModifyElementService {

  constructor() { }

  modifyElementText() {
    return document.getElementById('cover');
  }
}
