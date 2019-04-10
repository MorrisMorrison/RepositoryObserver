import { Component, OnInit } from '@angular/core';
import { TaskschedulerService } from "../service/taskscheduler/taskscheduler.service";
import { GetNotificationTO, Notification, AddNotificationTO } from "../dto/notificationTO";
import { GithubauthService } from '../service/githubauth/githubauth.service';
import { AlertifyService } from '../service/alertify/alertify.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { RepositoryTO } from '../dto/repositoryTO';
import { forEach } from '@angular/router/src/utils/collection';
import { EditNotificationComponent } from '../edit-notification/edit-notification.component';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  notifications: Notification[] = [];
  notificationTos: GetNotificationTO[] = [];
  selectedNotification: Notification;
  username: string;
  isAuthenticated: boolean;

  constructor(private taskSchedulerService: TaskschedulerService,
    private githubAuthService: GithubauthService,
    private alertifyService: AlertifyService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.loggedIn();
  }

  loggedIn() {
    this.githubAuthService.isAuthenticated().subscribe(response => {
      if (response.status == 200) {
        this.isAuthenticated = true;
        this.githubAuthService.getCurrentUser().subscribe(currentUser => {
          this.username = currentUser.username;
        });
        this.getAllNotifications();
      }
    });
  }

  getAllNotifications() {
    this.taskSchedulerService.getNotifications().subscribe(notificationTos => {
      this.notificationTos = notificationTos;
      this.notificationTos.forEach(notificationTO => {
        this.notifications.push(new Notification(notificationTO, false))
      })
    })
  }

  deleteNotifications() {
    this.alertifyService.confirm("Delete Notification", "Are you sure you want to delete this notification?", () => {
      let selectedNotifications = this.getSelectedNotifications();
      selectedNotifications.forEach(selectedNotification => {
        this.taskSchedulerService.deleteNotification(selectedNotification.getNotificationTO.frequency).subscribe(result => {
          if (result.status == 201){
            this.notifications.splice(this.notifications.indexOf(selectedNotification));
            this.alertifyService.success("Notification deleted.");
          }else{
            this.alertifyService.error("An error occured.");
          }

        });
      });
    });
  }

  editNotification() {
    const modalRef = this.modalService.open(EditNotificationComponent);
    modalRef.componentInstance.selectedNotification = this.getSelectedNotification();
    modalRef.componentInstance.username = this.username;
  }

  getSelectedNotifications(): Notification[] {
    return this.notifications.filter(notification => notification.selected == true);
  }
  getSelectedNotification(): Notification {
    let selectedNotifications: Notification[] = this.getSelectedNotifications();
    if (selectedNotifications != null) {
      this.selectedNotification = selectedNotifications[0];
      return this.selectedNotification;
    }
  }

  notificationCreated(notificationCreated: boolean) {
    if (notificationCreated == true) {
      this.notifications = [];
      this.getAllNotifications();
    }
  }

  uncheckNotifications() {
    this.notifications.forEach(notification => {
      notification.selected = false;
    })
  }
}
