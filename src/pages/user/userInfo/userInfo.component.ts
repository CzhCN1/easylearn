import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Bonus } from '../bonus/bonus.component';

import { AjaxService } from '../../../services/ajax.service';

@Component({
    selector: 'userInfo',
    templateUrl: 'userInfo.component.html',
    providers: [AjaxService]
})
export class UserInfo {
    ownCourse: any;
    ownBonus: any;
    userInfo: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public ajax: AjaxService
    ) {
        // this.ownCourse = [
        //     {
        //         text: "[说乎] 试听课"
        //     },
        //     {
        //         text: "[说乎] 试听课222222"
        //     },
        //     {
        //         text: "[说乎] 微基础课程"
        //     }
        // ]
        this.ownCourse = [];
        this.ownBonus = {};
        this.userInfo = {};

        this.ajax.get("/getUserCourse").then(data=>{
            this.ownCourse = data;
        });

        this.ajax.get("/getUserBonus").then(data=>{
            this.ownBonus = data;
        });
        
        this.ajax.get("/getUserInfo").then(data=>{
            this.userInfo = data;
        });
    }

    gotoBonus() {
        this.navCtrl.push(Bonus);
    }
}