import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  id:any;
  constructor(
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.loadDataForm();
  }
  loadDataForm() {
    this.id = (this.route.snapshot.paramMap.get('id'));
    console.log(this.id);
    this.authenticationService.getById(this.id)
    .subscribe(
      data => {
        console.log(data);
      
    
      }   
    )
  }
}
