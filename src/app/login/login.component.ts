import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router,private cv:CommonService) { }

  ngOnInit() {
    setTimeout(() => {
      this.cv.logout()
    }, 0);
  }
  login(obj){
    console.log(obj);
    if(obj.role=="admin")
    {
    if(obj.id!=="admin")
    {
      alert("invalid Username")
    }
    else if(obj.password!=="admin"){
      alert("invalid password")
    }
    else{
      alert("success login")
      this.cv.loggedInStatus=true;
      this.cv.loggedInUser=obj.id;
      this.router.navigate(['/admin'])
    }
  }
  else if(obj.role=='student')
  {
    this.cv.loginstudent(obj).subscribe((res)=>{
      if(res["message"]=="invalid-studentid")
      {
        alert("invalid username")
      }
      else if(res["message"]=="invalid-password")
      {
        alert("invalid-password")
      }
      else{
        alert("logged in successfully");
        this.cv.loggedInStatus=true;
        this.cv.loggedInUser=res["name"];
        console.log(this.cv.loggedInUser);
        this.router.navigate(['/student'])
      }
      
    })
  }
  else{
    alert("please choose role")
  }
}

}
