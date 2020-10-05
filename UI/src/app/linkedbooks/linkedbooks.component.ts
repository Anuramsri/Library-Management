import { Component} from '@angular/core';
import { GraphQlService } from "../../shared/graphql.service";

@Component({
  selector: 'app-linkedbooks',
  templateUrl: './linkedbooks.component.html',
  styleUrls: ['./linkedbooks.component.css']
})
export class LinkedbooksComponent{
  books:any =[]
  filterdBooks: any = []; 
  totalBooks = 0;
  limit = 5;
  page = 0;

  constructor(
    private graphqlService: GraphQlService,    
    ) {
  }

  ngOnInit() {
    this.getBooks();
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

  onChange(event) {
    this.page = event ? event.pageIndex : 0;
    this.limit = event ? event.pageSize : 5;
    this.filterdBooks = this.books.slice(this.page * this.limit, (this.page + 1) * this.limit);
    console.log(this.filterdBooks)
  }

}