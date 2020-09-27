import { Component, OnInit, TemplateRef } from '@angular/core';
import { ConfigurationService } from './configuration.service';
@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css'],
  providers:[ConfigurationService]
})
export class ConfigurationComponent implements OnInit {

  constructor() {
    this.books = [{book :'rework',author:'anu'},{book:'21st Centurary',author:'ram'}]
   }
   template;
   books;
  ngOnInit(): void {
  }

  openModal(template: TemplateRef<any>, act, data, index) {
  }
  getBooks(){

  }

}
