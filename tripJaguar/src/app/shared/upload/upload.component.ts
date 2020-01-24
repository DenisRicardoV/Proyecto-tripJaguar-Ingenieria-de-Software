import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';

import { MatDialogRef } from '@angular/material';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  @Output() filesEmit = new EventEmitter<any>();
  @ViewChild('file') file;
  public files: File[] = [];
  blobs = [];

  private typeAccepts = ['image/jpeg','image/png'];


  constructor(
    // public dialogRef: MatDialogRef<UploadComponent>
  ) { }

  ngOnInit() {
  }

  addFiles() {
    this.file.nativeElement.click();
  }

  onFilesAdded() {
    const files: { [key: string]: File } = this.file.nativeElement.files;
    for (let key in files) {
      if (!isNaN(parseInt(key))) {
        if(files[key].type== this.typeAccepts[0] ||files[key].type== this.typeAccepts[0] )
        {

          this.files.push(files[key]);
          this.filesEmit.emit(this.files);
          this.convertBlob(files[key]);

        }

      }
    }
  }



  convertBlob(file){
    var myReader:FileReader = new FileReader();
    myReader.onloadend = (e) => {
      var reader = e.target;
      this.blobs.push(reader.result);
    }
    myReader.readAsDataURL(file);
  }

  eliminarImg(index, file){
    this.files.splice(index,1)
    this.blobs.splice(index,1);
    this.filesEmit.emit(this.files);

  }


}
