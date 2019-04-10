import { Component, OnInit, Input } from '@angular/core';
import { RepositoryTO } from '../dto/repositoryTO';
import { NgbModalRef, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GetNotificationTO, Notification, AddNotificationTO } from "../dto/notificationTO";
import { TaskschedulerService } from '../service/taskscheduler/taskscheduler.service';
import { GithubauthService } from '../service/githubauth/githubauth.service';
import { AlertifyService } from '../service/alertify/alertify.service';
import { NotificationModel } from '../model/notification-model';


@Component({
  selector: 'app-edit-notification',
  templateUrl: './edit-notification.component.html',
  styleUrls: ['./edit-notification.component.css']
})
export class EditNotificationComponent implements OnInit {

  @Input() selectedNotification: Notification;
  @Input() username: string;

  notificationModel: NotificationModel = new NotificationModel();

  constructor(private taskSchedulerService: TaskschedulerService,
    private githubAuthService: GithubauthService,
    private alertifyService: AlertifyService,
    public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.getCurrentUserRepositories();
    this.getFrequencies();
    this.getCommonKeywords();
    this.selectedNotification.getNotificationTO.searchKeywords.forEach(searchKeyword => this.notificationModel.searchKeywords.push(searchKeyword))
    this.notificationModel.email = this.selectedNotification.getNotificationTO.email;
  }

  getCurrentUserRepositories() {
    this.githubAuthService.getCurrentUsersRepositories().subscribe(repositories => {
      this.notificationModel.repositoryTos = [];
      repositories.forEach(repository => {
        if (this.selectedNotification.getNotificationTO.repositories.some(x => x === repository)) {
          this.notificationModel.repositoryTos.push(new RepositoryTO(repository, true));
        } else {
          this.notificationModel.repositoryTos.push(new RepositoryTO(repository, false));
        }
      });
    });
  }

  uncheckUserRepositories() {
    this.notificationModel.repositoryTos.forEach(repository => {
      repository.selected = false;
    });
  }

  getFrequencies() {
    this.taskSchedulerService.getFrequencies().subscribe(frequencies => {
      this.notificationModel.frequencies = frequencies;
      this.notificationModel.selectedFrequency = this.notificationModel.frequencies[0];
    });
  }

  getCommonKeywords() {
    this.taskSchedulerService.getCommonKeywords().subscribe(commonKeywords => this.notificationModel.commonKeywords = commonKeywords);
  }

  addSearchKeyword(searchKeywordToAdd: string) {
    if (this.notificationModel.searchKeywords.filter(searchKeyword => searchKeyword == searchKeywordToAdd).length < 1) {
      this.notificationModel.searchKeywords.push(searchKeywordToAdd);
      this.notificationModel.searchKeywordToAdd = "";
    }
  }

  removeSearchKeyword(searchKeywordToDelete: string) {
    this.notificationModel.searchKeywords = this.notificationModel.searchKeywords.filter(searchKeyword => searchKeyword != searchKeywordToDelete);
  }

  saveNotification() {
    this.alertifyService.confirm("Save Changes?", "Do you want to save the changes you made to your notification?", () => {

      let notification: AddNotificationTO = new AddNotificationTO();
      notification.email = this.notificationModel.email;
      notification.username = this.username;
      notification.searchKeywords = this.notificationModel.searchKeywords;
      notification.frequency = this.selectedNotification.getNotificationTO.frequency;
      notification.repositories = this.getSelectedRepositories();

      this.taskSchedulerService.updateNotification(notification).subscribe(result => {

        if (result.status == 200) {

          this.selectedNotification.getNotificationTO.repositories = notification.repositories;
          this.selectedNotification.getNotificationTO.email = notification.email;
          this.selectedNotification.getNotificationTO.searchKeywords = notification.searchKeywords;

          this.alertifyService.success("Notification updated.");

        } else {
          this.alertifyService.error("An error occured.");

        }

        this.activeModal.close();
      });

    });
  }
  getSelectedRepositories(): string[] {
    let selectedRepositories: string[] = [];
    selectedRepositories = this.notificationModel.repositoryTos.filter(repository => repository.selected === true).map(repository => repository.name);
    return selectedRepositories;
  }

}
