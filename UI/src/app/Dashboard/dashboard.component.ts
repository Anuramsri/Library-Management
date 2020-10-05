import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material';
import { GraphQlService } from "../../shared/graphql.service";
import { Router } from "@angular/router";

export interface Book {
  name: string;
  author: string;
  publisher: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent{
  q;
  subscription;
  books:any =[]
  filterdBooks: any = [];
  totalBooks = 0;
  limit = 5;
  page = 0;
  name;
  role;
  
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  obs: Observable<any>;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private graphqlService: GraphQlService,
    private router: Router
    ) {
  }

  ngOnInit() {
    this.changeDetectorRef.detectChanges();
    this.getBooks();
    this.name =  localStorage.getItem('name')
    this.role = localStorage.getItem('role')
  }

  search(value){
    this.filterdBooks = this.books.filter(book => book.author.includes(value) || book.name.includes(value) || book.publisher.includes(value))
    this.totalBooks = this.filterdBooks.length;
    this.filterdBooks = this.filterdBooks.slice(this.page * this.limit, (this.page + 1) * this.limit);
    console.log(this.filterdBooks);
  }

  logout(){
    localStorage.clear();
    this.name= '';
    this.router.navigate(['/login']);
  }

  onChange(event) {
    this.page = event ? event.pageIndex : 0;
    this.limit = event ? event.pageSize : 5;
    this.filterdBooks = this.books.slice(this.page * this.limit, (this.page + 1) * this.limit);
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
        linked
      }
    }
    `
    )
    .subscribe((res) => {
      if (res["data"]) {
        if (res["data"]["books"]) {
          var dbook = [];
          for(var i =0;i<res["data"]["books"].length;i++){
            if(res['data']['books'][i]['linked']==null){
              dbook.push(res['data']['books'][i])
            }            
            this.books = dbook;
            this.totalBooks = this.books.length;
            this.onChange(null);
          }
        }
      }
    });
  }
}