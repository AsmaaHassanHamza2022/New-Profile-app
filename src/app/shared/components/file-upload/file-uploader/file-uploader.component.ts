import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef  } from '@angular/material/dialog';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit {

 
  isHovering: boolean;

  files: File[] = [];
  imageFile: File;
  isError: boolean;

  filesURLs: string[] = [];

  constructor(
      private dialogRef: MatDialogRef<FileUploaderComponent>,
      @Inject(MAT_DIALOG_DATA) public data:any
  ) { }

  ngOnInit(): void {
  }

  toggleHover(event: boolean): void {
      this.isHovering = event;
  }
  onUpload(evt:any){
    const files=evt?.target.files;
    this.onDrop(files);
  }

  onDrop(files: FileList): void {

      this.isError = false;

      if (this.data.crop && files.length > 1) {
          this.isError = true;
          return;
      }

      if (this.data.crop && files.length === 1 && files[0].type.split('/')[0] === 'image') {
          this.imageFile = files[0];
          return;
      }

      for (let i = 0; i < files.length; i++) {
          this.files.push(files[i]);
      }

      console.log(files);

  }

  onCrop(file: File): void {
    //   this.imageFile = null;
    //   this.files.push(file);
  }

  onUploadComplete(url: string): void {
      this.filesURLs.push(url);
  }

  onComplete(): void {
      const res = this.data.multiple ? this.filesURLs : this.filesURLs[0];
      this.dialogRef.close(res);
  }

  onClose(): void {
      this.dialogRef.close();
  }

}
