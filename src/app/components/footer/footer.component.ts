import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  now_year = new Date (Date.now()).getFullYear()

  constructor() { }

  ngOnInit(): void {
  }

}
