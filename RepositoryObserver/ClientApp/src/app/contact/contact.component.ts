import { Component, OnInit, Inject } from '@angular/core';
import { GithubauthService } from '../service/githubauth/githubauth.service';
import { DOCUMENT } from '@angular/common';
import { ContactService } from '../service/contact/contact.service';
import { ContactModel } from '../model/contact-model';
import { AddContactTO } from '../dto/contactTO';
import { AlertifyService } from '../service/alertify/alertify.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {


  isAuthenticated: boolean;
  username: string;
  contactModel:ContactModel = new ContactModel();
  formIsInvalid:boolean;

  constructor(private contactService:ContactService,
    private githubAuthService: GithubauthService,
    @Inject(DOCUMENT) private document:any,
    private alertifyService:AlertifyService) {

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
    if (this.checkFormIsInvalid()){
      this.alertifyService.error("Please provide all necessary information.");
      return;
    }

    var contactMessage:AddContactTO = new AddContactTO();
    contactMessage.name = this.contactModel.name;
    contactMessage.email = this.contactModel.email;
    contactMessage.subject = this.contactModel.subject;
    contactMessage.message = this.contactModel.message;


    this.contactService.addContact(contactMessage).subscribe(response => {
      console.log(response.status);
      if (response.status === 200) {
          this.alertifyService.success("Message created.");
      } else{
          this.alertifyService.error("An Error occurred.");
      }
      this.clearFormData();
    
    });
  }

  clearFormData(){
    this.contactModel.name = "";
    this.contactModel.email ="";
    this.contactModel.subject = "";
    this.contactModel.message = "";
  }



  checkFormIsInvalid(): boolean {
    let formIsInvalid: boolean = (this.contactModel.email.length < 4 || this.contactModel.name.length < 4 || this.contactModel.subject.length < 4 || this.contactModel.message.length < 20);
    if (formIsInvalid) {
        this.formIsInvalid = true;
        return true;
    }
    return false;
}

}
