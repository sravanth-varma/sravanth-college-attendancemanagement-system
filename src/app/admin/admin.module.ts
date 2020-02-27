import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';

import { GenerateidComponent } from './generateid/generateid.component';
import { RegisterstudentComponent } from './registerstudent/registerstudent.component';
import { BranchComponent } from './branch/branch.component';
import { MarksComponent } from './marks/marks.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { FormsModule } from '@angular/forms';
import { CommonComponent } from './common/common.component';
import { CommonPipe } from './common.pipe';


@NgModule({
  declarations: [AdminComponent, GenerateidComponent, RegisterstudentComponent, BranchComponent, MarksComponent, AttendanceComponent, CommonComponent, CommonPipe],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    
  ]
})
export class AdminModule { }
