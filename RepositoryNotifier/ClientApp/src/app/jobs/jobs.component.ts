import { Component, OnInit } from '@angular/core';
import { JobService } from "../service/job/job.service";
import { GetJobTO, Job, AddJobTO, JobResultTO } from "../dto/jobTO";
import { GithubauthService } from '../service/githubauth/githubauth.service';
import { AlertifyService } from '../service/alertify/alertify.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { RepositoryTO } from '../dto/repositoryTO';
import { forEach } from '@angular/router/src/utils/collection';
import { EditJobComponent } from '../edit-job/edit-job.component';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css'],
  providers: [DatePipe]
})
export class JobsComponent implements OnInit {

  jobs: Job[] = [];
  jobResults: { [key: string]: JobResultTO[]; } = {};
  jobTos: GetJobTO[] = [];
  keys: string[] = [];
  jobResultTos: JobResultTO[] = [];
  selectedJob: Job;
  username: string;
  isAuthenticated: boolean;
  collapseControl: { [key: string]: boolean;} = {};
  public isCollapsedJobs:boolean = false;

  constructor(private jobService: JobService,
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
    this.getAllJobs();
  }

  getAllJobs() {
    this.jobService.getJobs().subscribe(jobTos => {
      this.jobTos = jobTos;
      this.jobTos.forEach(jobTO => {
        this.jobs.push(new Job(jobTO, false))
      })
      if (this.jobs.length >= 1){
        this.getJobResults(this.jobs[0].getJobTO.frequency);
      }    
    })
  }

  getJobResults(frequency: number){
    this.jobService.getJobResults(frequency).subscribe(jobResultsTos => {
      this.jobResultTos = jobResultsTos;
      if(this.jobResultTos== null){
        this.jobResultTos = [];
      }
      this.jobResultTos.forEach(resultTO => {
        if (this.jobResults[resultTO.name + "|" + resultTO.path] == null || this.jobResults[resultTO.name + "|" + resultTO.path].length < 1){
          let results :JobResultTO[] = [];
          results.push(resultTO);
          this.jobResults[resultTO.name + "|" + resultTO.path]= results;
          this.keys.push(resultTO.name + "|" + resultTO.path);
          this.collapseControl[resultTO.name + "|" + resultTO.path]  = true;
        }else{
          this.jobResults[resultTO.name + "|" + resultTO.path].push(resultTO);
        }
      })
      console.log(this.keys);
    });
  }

  deleteJobs() {
    this.alertifyService.confirm("Delete Notification", "Are you sure you want to delete this notification?", () => {
      let selectedJobs = this.getSelectedJobs();
      selectedJobs.forEach(selectedJob => {
        this.jobService.deleteJob(selectedJob.getJobTO.frequency).subscribe(result => {
          if (result.status == 200){
            this.jobs.splice(this.jobs.indexOf(selectedJob));
            this.alertifyService.success("Notification deleted.");
          }else{
            this.alertifyService.error("An error occured.");
          }
        });
      });
    });
  }

  editJob() {
    const modalRef = this.modalService.open(EditJobComponent);
    modalRef.componentInstance.selectedNotification = this.getSelectedJob();
    modalRef.componentInstance.username = this.username;
  }

  getSelectedJobs(): Job[] {
    return this.jobs.filter(notification => notification.selected == true);
  }
  getSelectedJob(): Job {
    let selectedJobs: Job[] = this.getSelectedJobs();
    if (selectedJobs != null) {
      this.selectedJob = selectedJobs[0];
      return this.selectedJob;
    }
  }

  jobCreated(jobCreated: boolean) {
    if (jobCreated == true) {
      this.jobs = [];
      this.getAllJobs();
    }
  }

  uncheckJobs() {
    this.jobs.forEach(job => {
      job.selected = false;
    })
  }
}
