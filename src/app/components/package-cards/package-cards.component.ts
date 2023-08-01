import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

export interface packagesType {
  InvestmentType: string;
  packageTypes: string;
  percentages: number;
  duration: number;
  minValue: number;
  maxValue: number;
  refBonu: number;
  remark: string;

}

@Component({
  selector: 'app-package-cards',
  templateUrl: './package-cards.component.html',
  styleUrls: ['./package-cards.component.scss']
})
export class PackageCardsComponent {
  @Input() package!: packagesType

}
