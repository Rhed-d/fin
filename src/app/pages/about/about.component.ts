import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

 
  teamMembers = [
    {
      name: 'PETER MOREHEAD',
      image: 'fred.PNG',
      office: 'CEO & Co-Chief Investment Officer'
    },
    {
      name: 'FRANK LEWITTON',
      image: 'frank.PNG',
      office: 'President'
    },
    {
      name: 'NATHAUIEL RUG',
      image: 'nathaniel.PNG',
      office: 'Co-Chief Investment Officer'
    },
    {
      name: 'JOHN ERADITTAKIT',
      image: 'john.PNG',
      office: 'General Partner'
    },
    {
      name: 'PAUL STEPHANIAN',
      image: 'paul.PNG',
      office: 'Partner'
    },
    {
      name: 'LAUREN BI',
      image: 'luaren.PNG',
      office: 'Director of Portfolio Development'
    },
    {
      name: 'PAT GORHAM, CFA',
      image: 'pat.PNG',
      office: 'Chief Operating Officer'
    },

    {
      name: 'Adam Lewis',
      image: 'adam.PNG',
      office: 'Director of Capital Formation'
    },
    {
      name: 'TRENT ROSE BIENVENU',
      image: 'trent.PNG',
      office: 'Chief of Staff and Special Counsel'
    },
    {
      name: 'ROBERT CANCHOLA',
      image: 'robert.PNG',
      office: 'Deputy General Counsel'
    },
    {
      name: 'CHRIS VON ALLMEN',
      image: 'chris.PNG',
      office: 'Opportunities Portfolio Manager'
    },
    {
      name: 'GARY WONG',
      image: 'gary.PNG',
      office: 'Director of Investor Relations'
    },
    {
      name: 'PATRICK LOWE',
      image: 'patrick.PNG',
      office: 'Head of Content'
    },
    {
      name: 'MIKE ZURICK',
      image: 'mike.PNG',
      office: 'Head of Portfolio Talent'
    },
    {
      name: 'JOSEPH MUNSON',
      image: 'joseph.PNG',
      office: 'Head of Community'
    },
    {
      name: 'STEPHEN SAKICH',
      image: 'stephen.PNG',
      office: 'Director of Marketing & Communications'
    },
    {
      name: 'RAJU SINGH',
      image: 'raju.PNG',
      office: 'Investment Associate'
    },
    {
      name: 'CANDICE REID',
      image: 'candice.PNG',
      office: 'Investment Analyst'
    },
    {
      name: 'LUCY GIEG',
      image: 'lucy.PNG',
      office: 'Platform Associate'
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
