import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'common'
})
export class CommonPipe implements PipeTransform {

  transform(stdObj: object[], commonTerm: string): any[] {
    console.log(stdObj,commonTerm);
    if(!commonTerm)
 {
 return stdObj;
 }
 else
 {
 return stdObj.filter(data1=>
data1["fn"].toLowerCase().indexOf(commonTerm.toLowerCase())!==-1
)
}
}  
}
