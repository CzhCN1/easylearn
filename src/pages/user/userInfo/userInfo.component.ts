import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Bonus } from '../bonus/bonus.component';
import { Homework } from '../homework/homework.component';
import { Detail } from '../../introduction/detail/detail.component';

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
    expiryTime: String[];

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public ajax: AjaxService
    ) {
        this.ownCourse = [];
        this.ownBonus = {};
        this.userInfo = {};

        this.ajax.get("/getUserCourse").then(data=>{
            this.ownCourse = data;
            let expiryTime = [];
            for(let item in data){
                //时间戳
                let time = data[item]["expiryTime"];
                console.log(time);
                let date = new Date();
                date.setTime(time);
                let dateStr = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
                expiryTime.push(dateStr);
            }
            this.expiryTime = expiryTime;
            console.log(expiryTime);
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

    goHomework() {
        this.navCtrl.push(Homework);
    }

    itemSelected(item){
        let courseType = item.courseType;
        let courseNum = courseType == "0" ? 3 : 4;
        this.navCtrl.push(Detail,{
            courseNum : courseNum
        });
    }
}