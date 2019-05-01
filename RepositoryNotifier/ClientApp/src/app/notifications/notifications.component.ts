import { Component, OnInit } from '@angular/core';
import { TaskschedulerService } from "../service/taskscheduler/taskscheduler.service";
import { GetNotificationTO, Notification, AddNotificationTO, NotificationResultTO } from "../dto/notificationTO";
import { GithubauthService } from '../service/githubauth/githubauth.service';
import { AlertifyService } from '../service/alertify/alertify.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { RepositoryTO } from '../dto/repositoryTO';
import { forEach } from '@angular/router/src/utils/collection';
import { EditNotificationComponent } from '../edit-notification/edit-notification.component';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
  providers: [DatePipe]
})
export class NotificationsComponent implements OnInit {

  notifications: Notification[] = [];
  notificationResults: { [key: string]: NotificationResultTO[]; } = {};
  notificationTos: GetNotificationTO[] = [];
  keys: string[] = [];
  notificationResultTos: NotificationResultTO[] = [];
  selectedNotification: Notification;
  username: string;
  isAuthenticated: boolean;
  collapseControl: { [key: string]: boolean;} = {};

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
        this.initData();
      }
    });
  }

  initData(){
    this.getAllNotifications();
  }

  getAllNotifications() {
    this.taskSchedulerService.getNotifications().subscribe(notificationTos => {
      this.notificationTos = notificationTos;
      this.notificationTos.forEach(notificationTO => {
        this.notifications.push(new Notification(notificationTO, false))
      })
      if (this.notifications.length >= 1){
        this.getNotificationResults(this.notifications[0].getNotificationTO.frequency);
      }    
    })
  }

  getNotificationResults(frequency: number){
    this.taskSchedulerService.getNotificationResults(frequency).subscribe(notificationResultTos => {
      this.notificationResultTos = notificationResultTos;
      this.notificationResultTos.forEach(resultTO => {
        if (this.notificationResults[resultTO.name + "|" + resultTO.path] == null || this.notificationResults[resultTO.name + "|" + resultTO.path].length < 1){
          let results :NotificationResultTO[] = [];
          results.push(resultTO);
          this.notificationResults[resultTO.name + "|" + resultTO.path]= results;
          this.keys.push(resultTO.name + "|" + resultTO.path);
          this.collapseControl[resultTO.name + "|" + resultTO.path]  = true;
        }else{
          this.notificationResults[resultTO.name + "|" + resultTO.path].push(resultTO);
        }
      })
      console.log(this.keys);
    });
  }

  deleteNotifications() {
    this.alertifyService.confirm("Delete Notification", "Are you sure you want to delete this notification?", () => {
      let selectedNotifications = this.getSelectedNotifications();
      selectedNotifications.forEach(selectedNotification => {
        this.taskSchedulerService.deleteNotification(selectedNotification.getNotificationTO.frequency).subscribe(result => {
          if (result.status == 200){
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
