import { Component, OnInit, Input } from '@angular/core';
import { RepositoryTO } from '../dto/repositoryTO';
import { NgbModalRef, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GetJobTO, Job, AddJobTO } from "../dto/jobTO";
import { JobService } from '../service/job/job.service';
import { GithubauthService } from '../service/githubauth/githubauth.service';
import { AlertifyService } from '../service/alertify/alertify.service';
import { AddJobModel } from '../model/job-model';


@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.css']
})
export class EditJobComponent implements OnInit {

  @Input() selectedJob: Job;
  @Input() username: string;

  jobModel: AddJobModel = new AddJobModel();

  constructor(private jobService: JobService,
    private githubAuthService: GithubauthService,
    private alertifyService: AlertifyService,
    public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.getCurrentUserRepositories();
    this.getFrequencies();
    this.getCommonKeywords();
    this.selectedJob.getJobTO.searchKeywords.forEach(searchKeyword => this.jobModel.searchKeywords.push(searchKeyword))
    this.jobModel.email = this.selectedJob.getJobTO.email;
  }

  getCurrentUserRepositories() {
    this.githubAuthService.getCurrentUsersRepositories().subscribe(repositories => {
      this.jobModel.repositoryTos = [];
      repositories.forEach(repository => {
        if (this.selectedJob.getJobTO.repositories.some(x => x === repository)) {
          this.jobModel.repositoryTos.push(new RepositoryTO(repository, true));
        } else {
          this.jobModel.repositoryTos.push(new RepositoryTO(repository, false));
        }
      });
    });
  }

  uncheckUserRepositories() {
    this.jobModel.repositoryTos.forEach(repository => {
      repository.selected = false;
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

  addSearchKeyword(searchKeywordToAdd: string) {
    if (this.jobModel.searchKeywords.filter(searchKeyword => searchKeyword == searchKeywordToAdd).length < 1) {
      this.jobModel.searchKeywords.push(searchKeywordToAdd);
      this.jobModel.searchKeywordToAdd = "";
    }
  }

  removeSearchKeyword(searchKeywordToDelete: string) {
    this.jobModel.searchKeywords = this.jobModel.searchKeywords.filter(searchKeyword => searchKeyword != searchKeywordToDelete);
  }

  saveJob() {
    this.alertifyService.confirm("Save Changes?", "Do you want to save the changes you made to your notification?", () => {

      let job: AddJobTO = new AddJobTO();
      job.email = this.jobModel.email;
      job.username = this.username;
      job.searchKeywords = this.jobModel.searchKeywords;
      job.frequency = this.selectedJob.getJobTO.frequency;
      job.repositories = this.getSelectedRepositories();

      this.jobService.updateJob(job).subscribe(result => {

        if (result.status == 200) {

          this.selectedJob.getJobTO.repositories = job.repositories;
          this.selectedJob.getJobTO.email = job.email;
          this.selectedJob.getJobTO.searchKeywords = job.searchKeywords;

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
    selectedRepositories = this.jobModel.repositoryTos.filter(repository => repository.selected === true).map(repository => repository.name);
    return selectedRepositories;
  }

}
