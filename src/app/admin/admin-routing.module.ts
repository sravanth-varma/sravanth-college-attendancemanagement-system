import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { GenerateidComponent } from './generateid/generateid.component';
import { RegisterstudentComponent } from './registerstudent/registerstudent.component';
import { BranchComponent } from './branch/branch.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { MarksComponent } from './marks/marks.component';
import { CommonComponent } from './common/common.component';


const routes: Routes = [{path:'admin',component:AdminComponent,
children:[{path:'generateid',component:GenerateidComponent},
{path:'registerstudent',component:RegisterstudentComponent},
{path:'branch',component:BranchComponent,
children:[{path:"common",component:CommonComponent}]},
{path:'attendance',component:AttendanceComponent},
{path:'marks',component:MarksComponent}

]
}]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
