import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  constructor(private cv:CommonService) { }
username=this.cv.loggedInUser;

  ngOnInit() {
    console.log(this.username);
  }

}
