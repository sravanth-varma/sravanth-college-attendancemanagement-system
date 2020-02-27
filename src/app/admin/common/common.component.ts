import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common.service';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
const EXCEL_TYPE = 'application/vnd.openxmlformatsofficedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-common',
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.css']
})
export class CommonComponent implements OnInit {

  constructor(private cv:CommonService) { }
data1:any=[];
data2;
commonTerm;
ud:any=[];
stdObj;
//download Exel file
public downloadFile(): void {
  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.data1);
  const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames:
  ['data'] };
  const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type:
  'array' });
  this.saveAsExcelFile(excelBuffer, 'excelFileName');
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
  const data: Blob = new Blob([buffer], {type:EXCEL_TYPE});
  FileSaver.saveAs(data, fileName+'export'+new Date().getTime()+EXCEL_EXTENSION);
  }

  //download pdf
  downloadPDF(){
    const doc = new jsPDF()
    var col=["FULL NAME","STUDENT ID","GENDER","PHONE NO","ADDRESS","E-MAIL","YEAR","SSC","INTER"]
    var rows=[];
    this.data1.forEach(element=>{
    let name=element.fn+element.ln;
    let id=element.studentid;
    let gender=element.m;
    let pno=element.ph;
    let department=element.department;
    let address=element.ad;
    let email=element.email;
    let year=element.year;
    let ssc=element.ssc;
    let inter=element.inter;
    let temp=[name,id,gender,pno,department,address,email,year,ssc,inter]
    rows.push(temp)
    })
    doc.autoTable(col,rows,{
    theme:'grid'
    })
    doc.save('first.pdf')
   }
update(obj){
  this.ud=obj;
}
  ngOnInit() {

       //from service 
       this.data2=this.cv.toCommonComponent();
       this.cv.read1(this.data2).subscribe((dataArray)=>{
         this.data1=dataArray['message'];
       })




    
    // this.cv.read1().subscribe((rea)=>{
    //   this.data1=rea["message"];
    //   console.log(this.data1)
    // })
  }
  //sort by year
  obj={'year':0,'department':''};
  onYear(year:any){
  if(year==="all"){
    console.log(year);
    this.ngOnInit();
  }
  else{
    console.log(year);
    this.obj.year=year;
    this.obj.department=this.data2;
    console.log(this.obj);
    this.cv.readByYear(this.obj).subscribe((dataArray)=>{
      if(dataArray['message']==="nodatafound"){
        alert("no data found")
      }
      else{
        console.log(dataArray['message'])
         this.data1=dataArray['message'];
         console.log(this.data1)
         
      }
    })
  }
}
  registerStudent(obj){
    this.cv.register(obj).subscribe((res)=>{
      alert(res["message"])
      this.ngOnInit()

    })
    console.log(obj);
      }
      //delete
      deleteData(obj){
        console.log(obj);
        var a=confirm("are you sure you want to delete")
        if(a==true)
        {
          this.cv.delete(obj).subscribe((res)=>{
            if(res["message"]=="success"){
              alert("deleted")
              this.ngOnInit()
            }  
          })
        } 
      }
      registerStudent1(ud){
        console.log(ud);
        this.cv.update(ud).subscribe((obj)=>{ 
          if(obj["message"]=="success"){
            alert("update sucessfully")
            this.ngOnInit();
          }
          else if(obj["message"]=="nodata"){
            alert("not existed")
            this.ngOnInit();
          }
        })
       
      }
}
