import { Component, Inject, ViewChild } from '@angular/core';
import { GithubauthService } from "../service/githubauth/githubauth.service";
import { Router } from '@angular/router';
import { DOCUMENT } from "@angular/common";
import { AddJobComponent } from '../add-job/add-job.component';
import { NavMenuComponent } from '../nav-menu/nav-menu.component';
import { AlertifyService } from '../service/alertify/alertify.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {

    @ViewChild(NavMenuComponent) navMenuComponent: NavMenuComponent;
    @ViewChild(AddJobComponent) addJobComponent: AddJobComponent;

    isAuthenticated: boolean;
    username: string;

    constructor(private githubAuthService: GithubauthService, @Inject(DOCUMENT) private document: any, @Inject('BASE_URL') private baseUrl: string, private alertifyService:AlertifyService) {
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

    login() {
            this.document.location.href =  this.baseUrl + "api/auth/login";
    }
}

