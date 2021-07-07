import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, Validators  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, ExtraOptions } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { JobsComponent } from './jobs/jobs.component';
import { AddJobComponent } from './add-job/add-job.component';
import { GithubauthService } from './service/githubauth/githubauth.service';
import { FooterComponent } from './footer/footer.component';
import { JobService } from './service/job/job.service';
import { AlertifyService } from './service/alertify/alertify.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { EditJobComponent } from './edit-job/edit-job.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { PaymentsComponent } from './payments/payments.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ContactComponent } from './contact/contact.component';
import { ContactService } from './service/contact/contact.service';
import { SettingsService } from './service/settings/settings.service';

import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { FaqComponent } from './faq/faq.component';
import { SettingsComponent } from './settings/settings.component';

const config: ExtraOptions = {
  onSameUrlNavigation: 'reload'
};
@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    JobsComponent,
    AddJobComponent,
    FooterComponent,
    EditJobComponent,
    SubscriptionComponent,
    PaymentsComponent,
    CheckoutComponent,
    ContactComponent,
    PaymentDetailsComponent,
    FaqComponent,
    SettingsComponent,
  ],
  exports: [],
  entryComponents: [EditJobComponent, PaymentDetailsComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    NgbModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'notifications', component: JobsComponent },
      { path: 'payments', component: PaymentsComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'faq', component: FaqComponent },

    ], config)
  ],
  providers: [GithubauthService, JobService, AlertifyService, ContactService, SettingsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
