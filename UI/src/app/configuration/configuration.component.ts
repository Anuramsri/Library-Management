import { Component, OnInit, TemplateRef } from '@angular/core';
import { ConfigurationService } from './configuration.service';
@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css'],
  providers:[ConfigurationService]
})
export class ConfigurationComponent implements OnInit {

  loadComponent;
  config;
  configuration = [

    {
      id: 'role',
      name: 'Role Configuration'
    },
    {
      id: 'user',
      name: 'User Configuration'
    },
    {
      id: 'mail',
      name: 'Report Mail Configuration'
    },
    {
      id: 'plant',
      name: 'Plant Configuration'
    }
    ,

    {
      id: 'shop',
      name: 'Shop Configuration'
    },
    {
      id: 'shift',
      name: 'Shift Configuration'
    },
    {
      id: 'machine',
      name: 'Machine Configuration'
    },
    // {
    //   id: 'alarm',
    //   name: 'Alarm Configuration'
    // },

    {
      id: 'parameter',
      name: 'Parameter Configuration'
    },
    {
      id: 'downtimereasons',
      name: 'Downtime Reasons Configuration'
    },

    {
      id: 'rejectreasons',
      name: 'Reject Reasons Configuration'
    },

    {
      id: 'escalation',
      name: 'Escalation Mail Configuration'
    },

    {
      id: 'mold',
      name: 'Mold Configuration'
    },
    {
      id: 'pdtReasons',
      name: 'Planned Downtime Reason Configuration'
    }

  ]

  // config1;
  constructor() { }
  loadMyChildComponent(val) {
    this.loadComponent = val;

  }
  ngOnInit() {
    // this.loadComponent = 'pre';
    // this.loadComponent = this.configuration[0]['id'];

    // if (localStorage['role'].toUpperCase() == 'ADMIN') {
    //   this.configuration = [
    //     {
    //       id: 'downtimereasons',
    //       name: 'Downtime Reasons Configuration'
    //     },
    //     {
    //       id: 'rejectreasons',
    //       name: 'Reject Reasons Configuration'
    //     },
    //     {
    //       id: 'mold',
    //       name: 'Mold Configuration'
    //     },
    //     {
    //       id: 'parameter',
    //       name: 'Parameter Configuration'
    //     },


    //     {
    //       id: 'mail',
    //       name: 'Report Mail Configuration'
    //     },



    //     {
    //       id: 'escalation',
    //       name: 'Escalation Mail Configuration'
    //     },

    //   ];
    this.configuration = _.orderBy(this.configuration, ['name'], ['asc']);

    this.config = this.configuration[0]['id'];

    this.loadComponent = this.configuration[0]['id'];

    // // let permissions = JSON.parse(localStorage['permissions'])
    // // if(permissions && permissions['configuration'])  {
    // // permissions = permissions['configuration']
    // var temp = []
    // for (var i = 0; i < this.configuration.length; i++) {
    //   // if(permissions && permissions[this.configuration[i]['id']] && permissions[this.configuration[i]['id']]['View']) {
    //   temp.push(this.configuration[i])
    //   // }
    // }
    // this.configuration = temp
    // this.loadComponent = temp[0]['id'];
    // this.config = temp[0]['id'];
    // }
    // } else if (localStorage['role'] == 'SUPERADMIN') {
    //   this.configuration = _.orderBy(this.configuration, ['name'], ['asc']);

    //   this.loadComponent = this.configuration[0]['id'];
    //   this.config = this.configuration[0]['id'];
    // }







  }
  loadcomponent = this.config

  //  configuration = _.orderBy(this.config1, ['name'], ['asc']);

}
