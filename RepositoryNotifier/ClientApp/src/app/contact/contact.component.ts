import { Component, OnInit, Inject } from '@angular/core';
import { GithubauthService } from '../service/githubauth/githubauth.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {


  isAuthenticated: boolean;
  username: string;

  constructor(private githubAuthService: GithubauthService, @Inject(DOCUMENT) private document:any) {

  }

  ngOnInit() {
      this.loggedIn();
  }

  loggedIn() {
      this.githubAuthService.isAuthenticated().subscribe(response => {
          if (response.status == 200) {
              this.isAuthenticated = true;
              this.githubAuthService.getCurrentUser().subscribe(username => {
                  this.username = username.username
              });
          }
      });
  }


}
