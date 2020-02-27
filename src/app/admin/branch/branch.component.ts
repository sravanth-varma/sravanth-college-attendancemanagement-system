import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit {

  constructor(private r:Router,private cs:CommonService) { }

  ngOnInit() {
      }
  a;
  readBranch(obj)
 {
   console.log(obj)
   this.a=obj;
   this.cs.br=this.a;
this.r.navigate(['/admin/common'])
 }
 toService(){
  this.cs.frombranch=this.a;
}

}
