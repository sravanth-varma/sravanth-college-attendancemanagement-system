import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  loggedInStatus:boolean
  loggedInUser:any;
  logout()
  {
    this.loggedInStatus=false;
  }
  
  br;
  toCommonComponent(){
    return this.br;
  }


  frombranch:any=[];
  toComponent(){
    return this.frombranch;
  }
  bcode;
  constructor(private hc:HttpClient) { }
  //generate
  generate(obj):Observable<any>{
    this.bcode=obj.branchcode;
    return this.hc.post('/generate',obj)
  }
  

  read():Observable<any>{
    return this.hc.get<any>('/read')
  }
//register
  register(obj):Observable<any>{
    obj.branchcode=this.bcode;
    return this.hc.post('/register',obj)
  }

  read1(obj):Observable<any>{
    return this.hc.get<any>(`/read1/${obj}`)
  }
  delete(obj):Observable<any>{
    return this.hc.delete(`/remove/${obj.ph}`)
  }
  update(obj):Observable<any>{
    return this.hc.put('/update',obj);
  }
  readByYear(byyear):Observable<any>{
    console.log(byyear);
    return this.hc.post('/readbyyear',byyear)
  }
  loginstudent(obj):Observable<any>{
    console.log(obj);
    return this.hc.post('/login',obj)
  }
  setAttendence(data):Observable<any>{
    return this.hc.post<any>("/uploadattendence/",data);
    }
   
    getAttendence():Observable<any>{
      return this.hc.get('/getattendence')
    }
    getStudentAttendance(data):Observable<any>{
      return this.hc.get(`/readStudentAttendance/${data}`)
    }

    setMarks(obj):Observable<any>{
      return this.hc.post('/uploadmarks',obj)
    }

    getmarks():Observable<any>{
      return this.hc.get('/getmarks')
    }

    getStudentMarks(data):Observable<any>{
      console.log(data);
      return this.hc.get(`/readStudentMarks/${data}`)
    }

}
