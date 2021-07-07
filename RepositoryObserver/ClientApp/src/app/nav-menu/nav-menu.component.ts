import { Component, Input, Inject } from '@angular/core';
import { GithubauthService } from "../service/githubauth/githubauth.service";
import { UserTO } from "../dto/userTO";
import { DOCUMENT } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AlertifyService } from '../service/alertify/alertify.service';
import { Messages } from '../messages';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {

  isExpanded = false;

  constructor(private githubAuthService: GithubauthService, @Inject(DOCUMENT) private document: any, private router: Router, private alertifyService: AlertifyService ,@Inject('BASE_URL') private baseUrl: string) {
  }
  @Input() isAuthenticated: boolean;
  @Input() username: string;

  ngOnInit() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  logout() {
    this.githubAuthService.logout().subscribe(response => {
      this.router.navigate(['home']);
      this.alertifyService.success("Logged out.");
    });
  }

  login() {
    
    this.document.location.href = this.baseUrl + "api/auth/login";
}


}
