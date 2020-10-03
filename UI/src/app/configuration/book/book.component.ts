import { Component, OnInit, TemplateRef } from '@angular/core';
import { ConfigurationService } from '../configuration.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-book-configuration',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
  providers:[ConfigurationService]
})
export class BookConfigurationComponent implements OnInit {

  constructor(private modalService: BsModalService,private toastr: ToastrService,private configServe: ConfigurationService) {
    this.books = [{name :'rework',author:'anu',publisher : 'a1',thumbnail:''},{name :'21st',author:'ram',publisher : 'a1',thumbnail:''}]
   }

 books :any = [];
 modalRef: BsModalRef;
 modalRef1: BsModalRef;
 action;
 index;
 
 book:any = {
   thumbnail :''
 };

  ngOnInit(): void {
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
    this.configServe.getBooks()
    .subscribe(
      (res) => {
        console.log(res['result'])
      }
      )

  }

  saveTo(book){
    this.book = {...book} 
    console.log(this.book)
    this.modalRef.hide();
    console.log("Added successfully")
  }


  delete() {
    var data = this.book;
    this.toastr.success("Deleted Successfully", "Book");
    // this._bookService.deleteProcess(data['id'])
    //   .subscribe(
    //     (res) => {
    //       if(res['result']){
    //         this.books.splice(this.index, 1)
    //         this.toastr.success("Deleted Successfully", "Book");
    //       }
    //       else{
    //         this.toastr.success("Delete Failed!", "Book");
    //       }
    //     },
    //     err=>{
    //       console.log(err);
    //     })
  }

}
