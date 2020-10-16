import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-edit-customers',
  templateUrl: './edit-customers.component.html',
  styleUrls: ['./edit-customers.component.scss']
})
export class EditCustomersComponent implements OnInit {
    inputFieldDisabled:boolean = true;
    editFormGroup:FormGroup;
    imageUrl: any = '../../../../../assets/default-avatar-de27c3b396a84cb2b365a787c1a77cbe.png';
  constructor() { }

  ngOnInit() {
  }
  public uploader: FileUploader = new FileUploader({
    isHTML5: true
  });

  uploadFile(event){
    
  }
  onSubmit() {

  }
  editMode() {
    this.inputFieldDisabled = false;
  }
}
