import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { Course } from '../../course/course.component';
import { Buy } from './../buy/buy.component';

import { AjaxService } from '../../../services/ajax.service';

@Component({
    selector: 'detail',
    templateUrl: 'detail.component.html',
    providers: [AjaxService]
})
export class Detail {
    course: Object;
    items: any;
    isBuy: Boolean = true;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public ajax: AjaxService,
        public alertCtrl: AlertController
    ) {
        this.course = navParams.get('course');
        console.log(this.course);
        this.ajax.get('/getCourseList?courseNum='+this.course["courseNum"]).then(data=>{
            console.log(data);
            //用户没有买这门课程
            if(data["success"] === false){
                this.isBuy = false;
            }else{
                this.items = data;
                //用户买了课程但是还没有推送记录
                if(data["length"] === 0){
                    let alert = this.alertCtrl.create({
                        title: '提示',
                        subTitle: '您已购买课程，但是还没有推送的记录哦。每晚八点准时推送今日课程！',
                        buttons: ['OK']
                    });
                    alert.present();
                }
            }
        });
    }

    itemSelected(item) {
        console.log(item);
        this.navCtrl.push(Course, {
            item: item,
            course: this.course
        });
    }

    buyCourse() {
        this.navCtrl.push(Buy, {
            course: this.course["courseType"]
        });
    }
}