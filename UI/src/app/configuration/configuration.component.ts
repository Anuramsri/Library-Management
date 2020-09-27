import { Component, OnInit, TemplateRef } from '@angular/core';
import { ConfigurationService } from './configuration.service';
@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css'],
  providers:[ConfigurationService]
})
export class ConfigurationComponent implements OnInit {

  loadComponent;
  config;
  
  
  constructor() { }
  loadMyChildComponent(val) {
    this.loadComponent = val;

  }

  configuration = [
    {
      id: 'user',
      name: 'User Configuration'
    },
    {
      id: 'book',
      name: 'Book Configuration'
    }   
  ]

  ngOnInit() {
  }

}
