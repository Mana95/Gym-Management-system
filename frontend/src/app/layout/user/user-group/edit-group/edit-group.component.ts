import { AuthenticationService } from './../../../../services/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.scss']
})
export class EditGroupComponent implements OnInit {
  id: any;
  loading = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.id = (this.route.snapshot.paramMap.get('groupId'));
    console.log('Load Page ID :' + this.id)
    this.authenticationService.LoadGroupData(this.id)
    .subscribe(
      res => {
        console.log(res);
      },
      error=>{
        this.error = error;
      this.loading = false;
      }
    )
  }

}
