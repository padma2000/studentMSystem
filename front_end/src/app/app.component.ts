import { Component } from '@angular/core';
import { ApiserviceService } from './apiservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {
  title = 'front_end';
  constructor(private service: ApiserviceService) { }

  readData:any;
  successmsg:any;

  ngOnInit(): void {
    
  }

  

}
