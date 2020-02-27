import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentComponent } from './student.component';
import { ReadattendenceComponent } from './readattendence/readattendence.component';
import { ReadmarksComponent } from './readmarks/readmarks.component';


const routes: Routes = [{path:'student',component:StudentComponent,
children:[{path:'readattendence',component:ReadattendenceComponent},
          {path:'readmarks',component:ReadmarksComponent}]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
