import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, filter, from, map } from 'rxjs';
import { ReadJobs, deleteJob } from '../store/JobList/joblist.actions';
import { getLoading, selectAll } from '../store/JobList/joblist.selectors';
import { MatDialog } from '@angular/material/dialog';
import { AddEditJobComponent } from '../components/add-edit-job/add-edit-job.component';
import { Job } from '../store/JobList/joblist.model';
import { NotifierService } from 'src/app/services/notification/notifier.service';
import {IsRecuiter } from 'src/app/store/users/users.selectors';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit {

  public jobList$:Observable<Job[]>;
  public filteredJobList$:Observable<Job[]>;
  public loading$:Observable<boolean|null>;
  public allowEditing$:Observable<boolean|null>;

 
  constructor(private store:Store ,public dialog: MatDialog ,private notifierService:NotifierService) { }

  ngOnInit(): void {
    this.loading$=this.store.select(getLoading)
    this.jobList$=this.store.select(selectAll)
    this.filteredJobList$=this.store.select(selectAll);
    this.allowEditing$=this.store.select(IsRecuiter)

    this.store.dispatch(ReadJobs());
  }
  onAddNewJob(){
    const dialogRef=this.dialog.open(AddEditJobComponent,{
      width:'800px',
      height:'450px',
      data:{}
    });

  }
  onEditJob(job:Job){
    const dialogRef=this.dialog.open(AddEditJobComponent,{
      width:'800px',
      height:'450px',
      data:{value:job}
    });
  }

  onDeleteJob(jobId:string){
    this.store.dispatch(deleteJob({jobId:jobId}));
    this.notifierService.success("Job Deleted successfully")

  }
  onSearchByTitle(searchKey:string){
     searchKey=searchKey.toLowerCase();
     if(searchKey && searchKey !=''){
      this.filteredJobList$=this.jobList$.pipe(map((jobs:Job[])=> jobs.filter((job)=> job.title.toLowerCase().includes(searchKey))))
     }else{
      this.filteredJobList$=this.jobList$;
     }
  }
}
