import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { CardsComponent } from './cards/cards.component';
import { SingleRegFormComponent } from './single-reg-form/single-reg-form.component';
import { JointRegFormComponent } from './joint-reg-form/joint-reg-form.component';
import { MaterialsModule } from '../materials/materials.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { PriceTickerComponent } from './price-ticker/price-ticker.component';
import { LottieModule } from 'ngx-lottie';



@NgModule({
  declarations: [
    MenuComponent,
    FooterComponent,
    CardsComponent,
    SingleRegFormComponent,
    JointRegFormComponent,
    LoginComponent,
    PriceTickerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialsModule,
    ReactiveFormsModule,
  ],
  exports: [
    MenuComponent,
    FooterComponent,
    CardsComponent,
    SingleRegFormComponent,
    JointRegFormComponent,
    LoginComponent,
    PriceTickerComponent,
    LottieModule
  ]
})
export class SharedModule { }
