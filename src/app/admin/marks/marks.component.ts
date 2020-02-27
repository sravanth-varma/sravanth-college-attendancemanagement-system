import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-marks',
  templateUrl: './marks.component.html',
  styleUrls: ['./marks.component.css']
})
export class MarksComponent implements OnInit {
data;
  constructor(private cv:CommonService) { }

  ngOnInit() {
    this.cv.getmarks().subscribe((res)=>{
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
    uploadmarks(data){

      let formdata = new FormData();
     
      formdata.append("marks",this.file,this.file.name);
      this.cv.setMarks(formdata).subscribe((res)=>{
        if(res["message"]=="marks Sheet uploaded successfully")
        {
        alert(res["message"]);
        }
        else if(res["err_desc"]=="Corupted excel file"){
        alert(res["err_desc"]);
        }
    })
  }



}
