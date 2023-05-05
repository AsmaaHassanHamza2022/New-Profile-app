import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';

@Directive({
  selector: '[UploadFile]'
})
export class UploadFileDirective {
   @Input() multiple: boolean;
    @Input() crop: boolean;

    @Output() changed = new EventEmitter<string | string[]>();

  constructor(private dialog:MatDialog) {
   }

  @HostListener('click',['$event']) onClick(){
    this.openFileUploadDialog();
  }

  private openFileUploadDialog(){
    const dialogRef=this.dialog.open(FileUploaderComponent,{
      width:'500px',
      height:'500px',
      data:{
        multiple: this.multiple,
          crop: this.crop
      }
    });

    dialogRef.afterClosed().subscribe((result)=>{
      this.changed.emit(result || null);
    })
  }

}
