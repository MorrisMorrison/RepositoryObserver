import { Component, OnInit } from '@angular/core';
import { GithubauthService } from '../service/githubauth/githubauth.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  isAuthenticated: boolean;
    username: string;

    constructor(private githubAuthService: GithubauthService) {
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
