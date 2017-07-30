import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Detail } from './detail/detail.component';
import { Buy } from './buy/buy.component';

import { AjaxService } from '../../services/ajax.service';

@Component({
    selector: 'introduction',
    templateUrl: 'introduction.component.html',
    providers: [AjaxService]
})
export class Introduction {
    @Input() courseType: String;    //课程类型的标记

    demoCourses: Object[];     //试听课程数据
    noBaseCourses: Object[];   //零基础课程数据
    tinyBaseCourses: Object[]; //微基础课程数据

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public ajax: AjaxService
    ) {
        let courseType = navParams.get('courseType');
        this.courseType = "noBase";
        console.log(courseType);
        if(courseType){
            this.courseType = courseType;
        }
        this.demoCourses = [];
        this.noBaseCourses = [];
        this.tinyBaseCourses = [];
        this.initializeItems();
    }

    initializeItems() {
        var self = this;
        this.ajax.get("/getAllIntroduction").then(function(data: Array<Object>){
            self.demoCourses = data.filter(item=>(item["courseType"]==2 ? true : false));
            console.log(self.demoCourses);
            self.tinyBaseCourses = data.filter(item=>(item["courseType"]==1 ? true : false));
            console.log(self.tinyBaseCourses);
            self.noBaseCourses = data.filter(item=>(item["courseType"]==0 ? true : false));
            console.log(self.noBaseCourses);
        });
    }

    getItems(event) {
        const val = event.target.value;
        console.log(val);

        var showItems;
        if (this.courseType == 'demo') {
            showItems = this.demoCourses;
        } else if (this.courseType == 'noBase') {
            showItems = this.noBaseCourses;
        } else {
            showItems = this.tinyBaseCourses;
        }

        if (val && val.trim() != '') {
            showItems = showItems.filter((item) => {
                return (item["courseTitle"].toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
            if (this.courseType == 'demo') {
                this.demoCourses = showItems;
            } else if (this.courseType == 'noBase') {
                this.noBaseCourses = showItems;
            } else {
                this.tinyBaseCourses = showItems;
            }
        }else{
            this.initializeItems();
        }
    }

    gotoDetail(index: number, type: String) {
        console.log(index);
        console.log(type);
        var course;
        if (type == "demo") {
            course = this.demoCourses[index];
        } else if (type == "noBase") {
            course = this.noBaseCourses[index];
        } else {
            course = this.tinyBaseCourses[index];
        }
        this.navCtrl.push(Detail, {
            course: course
        });
    }

    buyCourse() {
        this.navCtrl.push(Buy, {
            course: this.courseType
        });
    }
}