import { Component, OnInit, TemplateRef } from '@angular/core';
import { ConfigurationService } from '../configuration.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { GraphQlService } from "../../../shared/graphql.service";
@Component({
  selector: 'app-user-configuration',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers:[ConfigurationService,GraphQlService]
})
export class UserConfigurationComponent implements OnInit {

  constructor(
    private modalService: BsModalService,
    private toastr: ToastrService,
    private graphqlService: GraphQlService,    
    ) {
    // this.users = [{name :'anu',mobileNumber:9944424289,email : 'anura,m.ar480@gmail.com',role:'Admin',password:"123"}]
    // this.roles = [{roleCode:1,roleName :'Admin'},{roleCode:2,roleName :'Normal'}]
   }

 users;
 roles;
 modalRef: BsModalRef;
 modalRef1: BsModalRef;
 action;
 index;
 user:any = {};

  ngOnInit(){
    this.get()
  }

  get() {
    this.graphqlService.get(
        `
      {
        users {
          _id
          name
          email
          mobileNumber
          role
        }
      }
      `
      )
      .subscribe((res) => {
        if (res["data"]) {
          if (res["data"]["users"]) {
            this.users = res["data"]["users"];
            // this.dataSource = new MatTableDataSource<any>(this.users);
            // this.dataSource.paginator = this.paginator;
            // this.dataSource.sort = this.sort;
          }
        }
      });
  }

  openModal(template: TemplateRef<any>, act, data, index) {
    this.modalRef = this.modalService.show(template, { backdrop: 'static' });
    this.action = act;
    console.log(data,index)
    if (data) {
      this.index = index;
      this.user = {
        user: data.user,
        author: data.author,
        publisher:data.publisher
      }
    }else {    
      this.user = {}
    }
  }
  getusers(){
  }

  saveTo(user){
    this.user = {
      user:user.user,
      author: user.author,
      publisher:user.publisher
    }
    console.log(this.user)
    this.modalRef.hide();
    console.log("Added successfully")
  }


  delete() {
    var data = this.user;
    this.toastr.success("Deleted Successfully", "user");
    // this._userService.deleteProcess(data['id'])
    //   .subscribe(
    //     (res) => {
    //       if(res['result']){
    //         this.users.splice(this.index, 1)
    //         this.toastr.success("Deleted Successfully", "user");
    //       }
    //       else{
    //         this.toastr.success("Delete Failed!", "user");
    //       }
    //     },
    //     err=>{
    //       console.log(err);
    //     })
  }

}
