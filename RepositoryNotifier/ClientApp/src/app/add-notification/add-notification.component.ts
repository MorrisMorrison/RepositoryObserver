import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { TaskschedulerService } from "../service/taskscheduler/taskscheduler.service";
import { GithubauthService } from "../service/githubauth/githubauth.service";
import { RepositoryTO } from "../dto/repositoryTO";
import { AddNotificationTO } from "../dto/notificationTO";
import { UserTO } from "../dto/userTO";
import { FormsModule, Validators } from '@angular/forms';
import { AlertifyService } from '../service/alertify/alertify.service';
import { NotificationModel } from '../model/notification-model';


@Component({
    selector: 'app-add-notification',
    templateUrl: './add-notification.component.html',
    styleUrls: ['./add-notification.component.css']
})
export class AddNotificationComponent implements OnInit, OnChanges {


    // public repositories: string[];
    // public repositoryTos: RepositoryTO[] = [];
    // public frequencies: number[];
    // public selectedFrequency: number;
    // public email: string;
    // public searchKeywords: string[] = [];
    // public searchKeywordToAdd: string;
    // public commonKeywords: string[] = [];

    notificationModel: NotificationModel = new NotificationModel();

    formIsInvalid: boolean;

    constructor(private githubAuthService: GithubauthService, private taskschedulerService: TaskschedulerService, private alertifyService: AlertifyService) { }

    @Input() username: string;
    @Input() isAuthenticated: boolean;
    @Output() notificationCreated = new EventEmitter<boolean>();


    ngOnInit() {

    }

    ngOnChanges() {
        this.refreshData();
    }

    refreshData() {
        if (this.isAuthenticated) {
            this.getCurrentUserRepositories();
            this.getFrequencies();
            this.getCommonKeywords();
        }
    }


    getCurrentUserRepositories() {
        this.githubAuthService.getCurrentUsersRepositories().subscribe(repositories => {
            this.notificationModel.repositories = repositories;
            this.notificationModel.repositoryTos = [];
            this.notificationModel.repositories.forEach(repository => this.notificationModel.repositoryTos.push(new RepositoryTO(repository, false)));
        });
    }

    getFrequencies() {
        this.taskschedulerService.getFrequencies().subscribe(frequencies => {
            this.notificationModel.frequencies = frequencies;
            this.notificationModel.selectedFrequency = this.notificationModel.frequencies[0];
        });
    }

    getCommonKeywords() {
        this.taskschedulerService.getCommonKeywords().subscribe(commonKeywords => this.notificationModel.commonKeywords = commonKeywords);
    }

    createNotification() {
        let notification: AddNotificationTO = new AddNotificationTO();
        notification.email = this.notificationModel.email;
        notification.frequency = this.notificationModel.selectedFrequency;
        notification.searchKeywords = this.notificationModel.searchKeywords;

        let repositories: string[] = this.getSelectedRepositories();
        notification.repositories = repositories;

        this.githubAuthService.getCurrentUser().subscribe(user => {
            notification.username = user.username;
            this.taskschedulerService.createNotification(notification).subscribe(response => {
                if (response.status === 201) {
                    this.notificationCreated.emit(true);
                    this.alertifyService.success("Notification created.");
                } else if (response.status === 409) {
                    this.alertifyService.error("Notification already exists.");
                }
                this.clearFormData();
            });
        });
    }

    checkFormIsInvalid(): boolean {
        let formIsInvalid: boolean = (this.notificationModel.email.length < 4 || this.notificationModel.selectedFrequency == null || this.notificationModel.searchKeywords.length < 1 || this.getSelectedRepositories().length < 1);
        if (formIsInvalid) {
            this.formIsInvalid = true;
            return true;
        }
        return false;
    }

    clearFormData() {
        this.notificationModel.email = "";
        this.notificationModel.selectedFrequency = this.notificationModel.frequencies[0];
        this.notificationModel.repositoryTos.forEach(repository => repository.selected = false);
        this.notificationModel.searchKeywords = [];
    }

    getSelectedRepositories(): string[] {
        let repositories: string[] = this.notificationModel.repositoryTos.filter(repositoryTO => repositoryTO.selected)
            .map(selectedRepository => selectedRepository.name);
        return repositories;
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

}
