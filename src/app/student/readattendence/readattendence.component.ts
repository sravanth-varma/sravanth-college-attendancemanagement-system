import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-readattendence',
  templateUrl: './readattendence.component.html',
  styleUrls: ['./readattendence.component.css']
})
export class ReadattendenceComponent implements OnInit {
data;
  constructor(private cv:CommonService) { }
  studentdata=this.cv.loggedInUser;
  studentid=this.cv.loggedInUser.studentid;

  ngOnInit() {
    console.log(this.studentid);
    this.cv.getStudentAttendance(this.studentid).subscribe((res)=>{
      if(res['message']=="no data found"){
        alert("no data found")
      }
      else{
        this.data=res['message'];
        console.log(this.data)
      }
    })
  }

}
