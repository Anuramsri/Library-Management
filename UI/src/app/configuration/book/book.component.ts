import { Component, OnInit, TemplateRef } from '@angular/core';
import { ConfigurationService } from '../configuration.service';
@Component({
  selector: 'app-book-configuration',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
  providers:[ConfigurationService]
})
export class BookConfigurationComponent implements OnInit {

  constructor() {
   }
 
  ngOnInit(): void {
  }

  openModal(template: TemplateRef<any>, act, data, index) {
  }
  getBooks(){

  }

}
