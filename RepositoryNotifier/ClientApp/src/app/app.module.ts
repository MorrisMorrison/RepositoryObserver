import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, Validators  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, ExtraOptions } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { AddNotificationComponent } from './add-notification/add-notification.component';
import { GithubauthService } from './service/githubauth/githubauth.service';
import { FooterComponent } from './footer/footer.component';
import { JobService } from './service/job/job.service';
import { AlertifyService } from './service/alertify/alertify.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { EditNotificationComponent } from './edit-notification/edit-notification.component';
import { AbonementComponent } from './abonement/abonement.component';
import { PaymentsComponent } from './payments/payments.component';
import { CheckoutComponent } from './checkout/checkout.component';

const config: ExtraOptions = {
  onSameUrlNavigation: 'reload'
};
@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    NotificationsComponent,
    AddNotificationComponent,
    FooterComponent,
    EditNotificationComponent,
    AbonementComponent,
    PaymentsComponent,
    CheckoutComponent,
  ],
  exports: [],
  entryComponents: [EditNotificationComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    NgbModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'notifications', component: NotificationsComponent },
      { path: 'payments', component: PaymentsComponent },
      { path: 'checkout', component: CheckoutComponent },
    ], config)
  ],
  providers: [GithubauthService, JobService, AlertifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
