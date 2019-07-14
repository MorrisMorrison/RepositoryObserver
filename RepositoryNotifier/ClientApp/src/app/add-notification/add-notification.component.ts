import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { JobService } from "../service/job/job.service";
import { GithubauthService } from "../service/githubauth/githubauth.service";
import { RepositoryTO } from "../dto/repositoryTO";
import { AddNotificationTO } from "../dto/notificationTO";
import { UserTO } from "../dto/userTO";
import { FormsModule, Validators } from '@angular/forms';
import { AlertifyService } from '../service/alertify/alertify.service';
import { AddNotificationModel } from '../model/notification-model';


@Component({
    selector: 'app-add-notification',
    templateUrl: './add-notification.component.html',
    styleUrls: ['./add-notification.component.css']
})
export class AddNotificationComponent implements OnInit, OnChanges {

    notificationModel: AddNotificationModel = new AddNotificationModel();

    formIsInvalid: boolean;

    constructor(private githubAuthService: GithubauthService, private jobService: JobService, private alertifyService: AlertifyService) { }

    @Input() username: string;
    @Input() isAuthenticated: boolean;
    @Output() notificationCreated = new EventEmitter<boolean>();

    schedulerEnabled: boolean = true;


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
        this.jobService.getFrequencies().subscribe(frequencies => {
            this.notificationModel.frequencies = frequencies;
            this.notificationModel.selectedFrequency = this.notificationModel.frequencies[0];
        });
    }

    getCommonKeywords() {
        this.jobService.getCommonKeywords().subscribe(commonKeywords => this.notificationModel.commonKeywords = commonKeywords);
    }

    createNotification() {
        let notification: AddNotificationTO = new AddNotificationTO();
        notification.email = this.notificationModel.email;
        notification.frequency = this.notificationModel.selectedFrequency;
        notification.searchKeywords = this.notificationModel.searchKeywords;
        notification.emailNotificationEnabled = true;
        notification.smsNotificationEnabled = this.notificationModel.smsNotificationEnabled;
        notification.whatsappNotificationEnabled = this.notificationModel.whatsappNotificationEnabled;
        notification.phoneNumber = this.notificationModel.phoneNumber;
        notification.schedulerEnabled = this.schedulerEnabled;
        
        let repositories: string[] = this.getSelectedRepositories();
        notification.repositories = repositories;

        this.githubAuthService.getCurrentUser().subscribe(user => {
            notification.username = user.username;
            this.jobService.createNotification(notification).subscribe(response => {
                console.log(response.status);
                if (response.status === 200) {
                    this.notificationCreated.emit(true);
                    this.alertifyService.success("Notification created.");
                } else if (response.status === 409) {
                    this.alertifyService.warning("Notification already exists.");
                } else{
                    this.alertifyService.error("An Error occurred.");
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
        this.notificationModel.phoneNumber ="";
        this.notificationModel.whatsappNotificationEnabled = false;
        this.notificationModel.smsNotificationEnabled = false;
        this.notificationModel.schedulerEnabled = false;
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


    schedulerEnabledChanged(){
        this.schedulerEnabled = !this.schedulerEnabled;
    }

    printModel(){
        console.log(this.notificationModel);
        console.log(this.schedulerEnabled);
    }

    phoneNumberRequired(): boolean{
        return this.notificationModel.phoneNumber.length < 1 && (this.notificationModel.whatsappNotificationEnabled || this.notificationModel.smsNotificationEnabled);
    }
}
