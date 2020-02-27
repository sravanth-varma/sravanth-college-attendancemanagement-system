import { Component } from '@angular/core';
import { CommonService } from './common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'prj1';
  constructor (public cv:CommonService){}

  logout()
  {
    this.cv.logout()
  }


}
