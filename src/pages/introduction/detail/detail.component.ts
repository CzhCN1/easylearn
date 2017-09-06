import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { Course } from '../../course/course.component';
import { Buy } from './../buy/buy.component';

import { AjaxService } from '../../../services/ajax.service';
declare var wx: any;
@Component({
    selector: 'detail',
    templateUrl: 'detail.component.html',
    providers: [AjaxService]
})
export class Detail {
    course: Object;
    items: any;
    isBuy: Boolean = true;
    courseNum: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public ajax: AjaxService,
        public alertCtrl: AlertController
    ) {
        this.course = navParams.get('course');
        this.courseNum = navParams.get('courseNum');
        console.log(this.course);
        if(this.course){
            this.getCourseList();
        }else if(this.courseNum){
            let self = this;
            self.ajax.get('/getIntroduction?courseNum='+this.courseNum).then(data=>{
                self.course = data;
                console.log(self.course);
                self.getCourseList.apply(self);
            });
        }

        setTimeout(function(){
            wx.hideAllNonBaseMenuItem();
        },3000);
        // wx.hideMenuItems({
        //     menuList: [
        //       "menuItem:share:appMessage",
        //       "menuItem:share:timeline",
        //       "menuItem:share:qq",
        //       "menuItem:share:weiboApp",
        //       "menuItem:share:facebook",
        //       "menuItem:share:QZone",
        //       "menuItem:copyUrl",
        //       "menuItem:originPage",
        //       "menuItem:openWithQQBrowser",
        //       "menuItem:openWithSafari"
        //     ] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
        // });
    }

    itemSelected(item) {
        console.log(item);
        this.navCtrl.push(Course, {
            item: item,
            course: this.course
        });
    }

    buyCourse() {
        console.log(this.course);
        this.navCtrl.push(Buy, {
            course: this.course,
            courseType: this.course["courseType"]
        });
    }

    getCourseList(){
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
}