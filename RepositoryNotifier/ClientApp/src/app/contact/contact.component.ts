import { Component, OnInit, Inject } from '@angular/core';
import { GithubauthService } from '../service/githubauth/githubauth.service';
import { DOCUMENT } from '@angular/common';
import { ContactService } from '../service/contact/contact.service';
import { ContactModel } from '../model/contact-model';
import { AddContactTO } from '../dto/contactTO';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {


  isAuthenticated: boolean;
  username: string;
  contactModel:ContactModel = new ContactModel();

  constructor(private contactService:ContactService, private githubAuthService: GithubauthService, @Inject(DOCUMENT) private document:any) {

  }

  ngOnInit() {
      this.loggedIn();
  }

  loggedIn() {
      this.githubAuthService.isAuthenticated().subscribe(response => {
          if (response.status == 200) {
              this.isAuthenticated = true;
              this.githubAuthService.getCurrentUser().subscribe(username => {
                  this.username = username.username;
              });
          }
      });
  }

  sendMessage(){
    var contactMessage:AddContactTO = new AddContactTO();
    contactMessage.name = this.contactModel.name;
    contactMessage.email = this.contactModel.email;
    contactMessage.subject = this.contactModel.subject;
    contactMessage.message = this.contactModel.message;

    console.log(contactMessage);

    this.contactService.addContact(contactMessage).subscribe();
  }

}
