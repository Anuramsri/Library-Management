import { Component, OnInit, TemplateRef } from '@angular/core';
import { ConfigurationService } from '../configuration.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { GraphQlService } from "../../../shared/graphql.service";
@Component({
  selector: 'app-book-configuration',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
  providers:[ConfigurationService]
})
export class BookConfigurationComponent implements OnInit {

  constructor(
    private modalService: BsModalService,
    private toastr: ToastrService,
    private configServe: ConfigurationService,
    private fb: FormBuilder,
    private graphqlService: GraphQlService
   ) {
    // this.books = [{name :'rework',author:'anu',publisher : 'a1',thumbnail:''},{name :'21st',author:'ram',publisher : 'a1',thumbnail:''}]
   }

 books :any = [];
 book:any = {
   name : '',
   author : '',
   publisher:''
 };
 modalRef: BsModalRef;
 modalRef1: BsModalRef;
 action;
 index;

 bookForm: FormGroup;
 


  ngOnInit(): void {
    this.bookForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      author: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z ]+')]),
      publisher: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z ]+')]),
    })
    this.getBooks()
  }

  openModal(template: TemplateRef<any>, act, data, index) {
    this.modalRef = this.modalService.show(template, { backdrop: 'static' });
    this.action = act;
    console.log(data,index)
    if (data) {
      this.index = index;
      this.book = {...data}
    }else {    
      this.book = {}
    }
  }

  handleFileInput(file) {
    if (!file[0]) return
    if (file[0]['size'] > 1247399) {
      this.books[this.index]['thumbnail'] = undefined
      return this.toastr.error("file size shouldn't exceed 1mb")
    }

    this.books[this.index]['thumbnail'] = file[0]
  }

  getBooks(){
    this.graphqlService.get(
      `
    {
      books {
        _id
        name
        publisher
        author
      }
    }
    `
    )
    .subscribe((res) => {
      if (res["data"]) {
        if (res["data"]["books"]) {
          this.books = res["data"]["books"];
          console.log(this.books)
        }
      }
    });
  }

  saveTo(){
    console.log(this.bookForm.value);
    this.book = {...this.bookForm.value} 
    this.modalRef.hide();
    console.log("Added successfully")
  }


  delete() {
    this.toastr.success("Deleted Successfully", "Book");
  }

}
