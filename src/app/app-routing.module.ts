import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DepartmentsComponent } from './departments/departments.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { LoginComponent } from './login/login.component';
import { CivilComponent } from './civil/civil.component';
import { CseComponent } from './cse/cse.component';
import { EceComponent } from './ece/ece.component';
import { MechanicalComponent } from './mechanical/mechanical.component';

const routes: Routes = [{path:"",redirectTo:"home",pathMatch:"full"},{path:"home",component:HomeComponent},
                        {path:"departments",component:DepartmentsComponent},
                        {path:"civil",component:CivilComponent},
                        {path:"cse",component:CseComponent},
                        {path:"ece",component:EceComponent},
                        {path:"mechanical",component:MechanicalComponent},
                        {path:"aboutus",component:AboutusComponent},
                        {path:"contactus",component:ContactusComponent},
                        {path:"login",component:LoginComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
