import { Component, OnInit, TemplateRef } from '@angular/core';
import { ConfigurationService } from '../configuration.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { GraphQlService } from "../../../shared/graphql.service";
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
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
    private apollo : Apollo   
    ) {
    // this.users = [{name :'anu',mobileNumber:9944424289,email : 'anura,m.ar480@gmail.com',role:'Admin',password:"123"}]
    this.roles = ['Admin','User']
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
      this.user = {...data}
    }else {    
      this.user = {}
    }
  }
  getusers(){
  }

  saveTo(user){
    if(this.action == 'Add'){
      const userData = gql`
      mutation addUser($name:String,$email:String,$mobileNumber:String,$password:String,$role:String){
        addUser(name:$name,email:$email,mobileNumber:$mobileNumber,password:$password,role:$role) {
         name
         email
         mobileNumber
         password
         role
        }
      }
    `;
    
      this.apollo.mutate({
        mutation: userData,
        variables : {
          name: user.name,
          email:user['email'],
          mobileNumber:user['mobileNumber'],
          password:user['password'],
          role:user['role']
        }
      }).subscribe(res=>{
        if(res['data']){
          this.get();
          this.modalRef.hide();
          this.toastr.success("Added succesfully") 
        }else{
          this.toastr.error("email should be unique")
        }
      });
    }else{

      const userData = gql`
      mutation updateUser($id:String,$name:String,$email:String,$mobileNumber:String){
        updateUser(_id: $id,name:$name,email:$email,mobileNumber:$mobileNumber) {
         name
         email
         mobileNumber
         password
         role
        }
      }
    `;    
      this.apollo.mutate({
        mutation: userData,
        variables : {
          id : user._id,
          name: user.name,
          email:user['email'],
          mobileNumber:user['mobileNumber']
        }
      }).subscribe(res=>{
        if(res['data']){
          this.get();
          this.modalRef.hide();
          this.toastr.success("updated succesfully")          
        }

      });
    }    
  }


  delete() {
    var data = this.user;
    console.log(data)
    const userData = gql`
    mutation removeUser($id:String){
      removeUser(_id: $id) {
        name
      }
    }
  `;
  
    this.apollo.mutate({
      mutation: userData,
      variables : {
        id: data._id
      }
    }).subscribe(res=>{
      if(res['data']){
        this.get();
        this.modalRef.hide();
        this.toastr.success("Deleted succesfully")
      }
    });
  }

}
