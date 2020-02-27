import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DepartmentsComponent } from './departments/departments.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { LoginComponent } from './login/login.component';
import { CivilComponent } from './civil/civil.component';
import { CseComponent } from './cse/cse.component';
import { EceComponent } from './ece/ece.component';
import { MechanicalComponent } from './mechanical/mechanical.component';
import { AdminModule } from './admin/admin.module';
import { StudentModule } from './student/student.module';
import { HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DepartmentsComponent,
    AboutusComponent,
    ContactusComponent,
    LoginComponent,
    CivilComponent,
    CseComponent,
    EceComponent,
    MechanicalComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AdminModule,
    StudentModule,
    HttpClientModule
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
