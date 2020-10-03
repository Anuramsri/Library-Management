import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { debounceTime } from 'rxjs/operators';
export interface Card {
  title: string;
  author: string;
  publisher: string;
}

const DATA: Card[] = [
  {
    title: 'books 1',
    author: 'Don Lee Anu',
    publisher: 'Published by Ram publication'
  },
  {
    title: 'books 2',
    author: 'Don Lee Anu',
    publisher: 'Published by Ram publication'
  },
  {
    title: 'books 3',
    author: 'Don Lee Anu',
    publisher: 'Published by Ram publication'
  },
  {
    title: 'books 4',
    author: 'Don Lee Anu',
    publisher: 'Published by Ram publication'
  },
  {
    title: 'books 5',
    author: 'Don Lee Anu',
    publisher: 'Published by Ram publication'
  },
  {
    title: 'books 6',
    author: 'Don Lee Anu',
    publisher: 'Published by Ram publication'
  },
  {
    title: 'books 7',
    author: 'Don Lee Anu',
    publisher: 'Published by Ram publication'
  },
  {
    title: 'books 8',
    author: 'Don Lee Anu',
    publisher: 'Published by Ram publication'
  },
  {
    title: 'books 9',
    author: 'Don Lee Anu',
    publisher: 'Published by Ram publication'
  },
  {
    title: 'books 10',
    author: 'Don Lee Anu',
    publisher: 'Published by Ram publication'
  }
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  q;
  subscription;
  
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  obs: Observable<any>;
  dataSource: MatTableDataSource<Card> = new MatTableDataSource<Card>(DATA);

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.obs = this.dataSource.connect();
  }

  search(){
    var data =  this.q
    console.log(data)
  }


  ngOnDestroy() {
    if (this.dataSource) { 
      this.dataSource.disconnect(); 
    }
  }
}