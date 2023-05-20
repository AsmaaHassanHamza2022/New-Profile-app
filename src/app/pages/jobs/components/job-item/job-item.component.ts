import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Job } from '../../store/JobList/joblist.model';

@Component({
  selector: 'job-item',
  templateUrl: './job-item.component.html',
  styleUrls: ['./job-item.component.scss']
})
export class JobItemComponent implements OnInit {
  @Input() job:Job={} as Job;
  @Input() allowEditing:boolean |null=false;
  @Output() EditJob:EventEmitter<Job> =new EventEmitter<Job>();
  @Output() DeleteJob:EventEmitter<string> =new EventEmitter<string>();

  public popoverTitle = 'Popover title';
  public popoverMessage = 'Popover description';
  public confirmClicked = false;
  public cancelClicked = false;

  constructor() { }

  ngOnInit(): void {
  }
  onEdit(selectedJob:Job){
   this.EditJob.emit(selectedJob);
  }
  onDelete(jobId:string){
    this.DeleteJob.emit(jobId);

  }

}
