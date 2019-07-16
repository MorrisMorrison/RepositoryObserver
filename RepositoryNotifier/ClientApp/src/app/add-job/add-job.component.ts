import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { JobService } from "../service/job/job.service";
import { GithubauthService } from "../service/githubauth/githubauth.service";
import { RepositoryTO } from "../dto/repositoryTO";
import { AddJobTO } from "../dto/jobTO";
import { UserTO } from "../dto/userTO";
import { FormsModule, Validators } from '@angular/forms';
import { AlertifyService } from '../service/alertify/alertify.service';
import { AddJobModel } from '../model/job-model';


@Component({
    selector: 'app-add-job',
    templateUrl: './add-job.component.html',
    styleUrls: ['./add-job.component.css']
})
export class AddJobComponent implements OnInit, OnChanges {

    jobModel: AddJobModel = new AddJobModel();

    formIsInvalid: boolean;

    constructor(private githubAuthService: GithubauthService, private jobService: JobService, private alertifyService: AlertifyService) { }

    @Input() username: string;
    @Input() isAuthenticated: boolean;
    @Output() jobCreated = new EventEmitter<boolean>();

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
            this.jobModel.repositories = repositories;
            this.jobModel.repositoryTos = [];
            this.jobModel.repositories.forEach(repository => this.jobModel.repositoryTos.push(new RepositoryTO(repository, false)));
        });
    }

    getFrequencies() {
        this.jobService.getFrequencies().subscribe(frequencies => {
            this.jobModel.frequencies = frequencies;
            this.jobModel.selectedFrequency = this.jobModel.frequencies[0];
        });
    }

    getCommonKeywords() {
        this.jobService.getCommonKeywords().subscribe(commonKeywords => this.jobModel.commonKeywords = commonKeywords);
    }

    createJob() {
        let job: AddJobTO = new AddJobTO();
        job.email = this.jobModel.email;
        job.frequency = this.jobModel.selectedFrequency;
        job.searchKeywords = this.jobModel.searchKeywords;
        job.emailNotificationEnabled = true;
        job.smsNotificationEnabled = this.jobModel.smsNotificationEnabled;
        job.whatsappNotificationEnabled = this.jobModel.whatsappNotificationEnabled;
        job.phoneNumber = this.jobModel.phoneNumber;
        job.schedulerEnabled = this.schedulerEnabled;
        
        let repositories: string[] = this.getSelectedRepositories();
        job.repositories = repositories;

        this.githubAuthService.getCurrentUser().subscribe(user => {
            job.username = user.username;
            this.jobService.createJob(job).subscribe(response => {
                console.log(response.status);
                if (response.status === 200) {
                    this.jobCreated.emit(true);
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
        let formIsInvalid: boolean = (this.jobModel.email.length < 4 || this.jobModel.selectedFrequency == null || this.jobModel.searchKeywords.length < 1 || this.getSelectedRepositories().length < 1);
        if (formIsInvalid) {
            this.formIsInvalid = true;
            return true;
        }
        return false;
    }

    clearFormData() {
        this.jobModel.email = "";
        this.jobModel.selectedFrequency = this.jobModel.frequencies[0];
        this.jobModel.repositoryTos.forEach(repository => repository.selected = false);
        this.jobModel.searchKeywords = [];
        this.jobModel.phoneNumber ="";
        this.jobModel.whatsappNotificationEnabled = false;
        this.jobModel.smsNotificationEnabled = false;
        this.jobModel.schedulerEnabled = false;
    }

    getSelectedRepositories(): string[] {
        let repositories: string[] = this.jobModel.repositoryTos.filter(repositoryTO => repositoryTO.selected)
            .map(selectedRepository => selectedRepository.name);
        return repositories;
    }

    addSearchKeyword(searchKeywordToAdd: string) {
        if (this.jobModel.searchKeywords.filter(searchKeyword => searchKeyword == searchKeywordToAdd).length < 1) {
            this.jobModel.searchKeywords.push(searchKeywordToAdd);
            this.jobModel.searchKeywordToAdd = "";
        }
    }

    removeSearchKeyword(searchKeywordToDelete: string) {
        this.jobModel.searchKeywords = this.jobModel.searchKeywords.filter(searchKeyword => searchKeyword != searchKeywordToDelete);
    }


    schedulerEnabledChanged(){
        this.schedulerEnabled = !this.schedulerEnabled;
    }

    printModel(){
        console.log(this.jobModel);
        console.log(this.schedulerEnabled);
    }

    phoneNumberRequired(): boolean{
        return this.jobModel.phoneNumber.length < 1 && (this.jobModel.whatsappNotificationEnabled || this.jobModel.smsNotificationEnabled);
    }
}
