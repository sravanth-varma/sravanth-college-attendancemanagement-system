import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  data: any;


  constructor(private cv:CommonService) { }

  ngOnInit() {
    this.cv.getAttendence().subscribe((res)=>{
      if(res['message']==="no data found"){
        alert("no data found")
      }
      else{
        this.data=res["message"];
        console.log(this.data);
      }
    })
  }
  file:File;
  fileUpload(filedata){

    this.file=filedata.target.files[0];
    }
    uploadattendance(data){

      let formdata = new FormData();
      formdata.append("branchname",data.branch);
      formdata.append("year",data.year);
      formdata.append("attendance",this.file,this.file.name);
      this.cv.setAttendence(formdata).subscribe((res)=>{
        if(res["message"]=="Attendence Sheet uploaded successfully")
        {
        alert(res["message"]);
        }
        else if(res["err_desc"]=="Corupted excel file"){
        alert(res["err_desc"]);
        }
    })
  }
}
