import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import { UploadFileDirective } from './upload-file.directive';
import {MatDialogModule} from '@angular/material/dialog';
import { DropZoneDirective } from './drop-zone/drop-zone.directive';
import { UploadComponent } from './component/upload/upload.component';
import { FileSizePipe } from './pipes/file-size.pipe';



@NgModule({
  declarations: [
    FileUploaderComponent,
    UploadFileDirective,
    DropZoneDirective,
    UploadComponent,
    FileSizePipe
  ],
  imports: [
    CommonModule,
    MatDialogModule
  ],
  exports:[UploadFileDirective]
})
export class FileUploadModule { }
