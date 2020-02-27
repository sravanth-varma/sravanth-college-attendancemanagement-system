import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student.component';
import { ReadattendenceComponent } from './readattendence/readattendence.component';
import { ReadmarksComponent } from './readmarks/readmarks.component';


@NgModule({
  declarations: [StudentComponent, ReadattendenceComponent, ReadmarksComponent],
  imports: [
    CommonModule,
    StudentRoutingModule
  ]
})
export class StudentModule { }
