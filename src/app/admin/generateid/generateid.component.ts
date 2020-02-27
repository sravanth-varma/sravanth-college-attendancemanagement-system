import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-generateid',
  templateUrl: './generateid.component.html',
  styleUrls: ['./generateid.component.css']
})
export class GenerateidComponent implements OnInit {

  constructor(private cs:CommonService) { }
  data:any=[];
  
  ngOnInit() {
    this.cs.read().subscribe((rea)=>{
    this.data=rea["message"];
    console.log(this.data)
    })


  }

   
  generateId(obj){
    obj.count=0;
this.cs.generate(obj).subscribe((res)=>{
if(res['message']="id generated already"){
  alert('id generated already')
  this.ngOnInit()
}
else{
  alert(res["message"])
  this.ngOnInit();
}
 })
console.log(obj);
  }
}
