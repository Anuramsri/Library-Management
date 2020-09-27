import { Component, OnInit, TemplateRef } from '@angular/core';
import { ConfigurationService } from '../configuration.service';
@Component({
  selector: 'app-user-configuration',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers:[ConfigurationService]
})
export class UserConfigurationComponent implements OnInit {

  constructor() {}
   
  ngOnInit(): void {
  }

  openModal(template: TemplateRef<any>, act, data, index) {
  }
  getBooks(){

  }

}
