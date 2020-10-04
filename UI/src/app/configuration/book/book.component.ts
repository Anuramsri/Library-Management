import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { GraphQlService } from "../../../shared/graphql.service";
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-book-configuration',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
  providers:[]
})
export class BookConfigurationComponent implements OnInit {

  constructor(
    private modalService: BsModalService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private graphqlService: GraphQlService,
    private apollo : Apollo   
   ){}

 books :any = [];
 book:any ={};
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
    }else{
      this.bookForm.value['thumbnail']= file[0]['name']
      console.log(file[0])
    }
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

  // handleFileInput(e){
  //   console.log(e)
  // }

  saveTo(){
    console.log(this.bookForm.value);
    this.book = {...this.bookForm.value}

    if(this.action == 'Add'){
      const userData = gql`
      mutation addBook($name:String,$publisher:String,$author:String,$thumbnail:String){
        addBook(name:$name,publisher:$publisher,author:$author,thumbnail:$thumbnail) {
         name
         publisher
         author
         thumbnail
        }
      }
    `;
    
      this.apollo.mutate({
        mutation: userData,
        variables : {
          name: this.book['name'],
          publisher:this.book['publisher'],
          author:this.book['author'],
          thumbnail : this.book['thumbnail']
        }
      }).subscribe(res=>{
        if(res['data']){
          this.getBooks();
          this.modalRef.hide();
          this.toastr.success("Added succesfully") 
        }else{
          this.toastr.error("email should be unique")
        }
      });
    }else{

      const userData = gql`
      mutation updateUser($id:String,$name:String,$publisher:String,$author:String){
        updateUser(_id: $id,name:$name,publisher:$publisher,author:$author) {
         name
         publisher
         author
        }
      }
    `;    
      this.apollo.mutate({
        mutation: userData,
        variables : {
          id : this.book._id,
          name: this.book.name,
          publisher:this.book['publisher'],
          author:this.book['author']
        }
      }).subscribe(res=>{
        if(res['data']){
          this.getBooks();
          this.modalRef.hide();
          this.toastr.success("updated succesfully")          
        }

      });
    }
  }


  delete() {
    this.toastr.success("Deleted Successfully", "Book");
  }

}
