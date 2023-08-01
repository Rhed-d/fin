import { Component } from '@angular/core';
import { faq } from './faq';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss']
})
export class FaqsComponent {
  Faqs = faq
}
