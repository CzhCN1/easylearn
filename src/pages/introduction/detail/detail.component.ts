import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Course } from '../../course/course.component';

import { AjaxService } from '../../../services/ajax.service';

@Component({
    selector: 'detail',
    templateUrl: 'detail.component.html',
    providers: [AjaxService]
})
export class Detail {
    course: Object;

    items: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public ajax: AjaxService
    ) {
        this.course = navParams.get('course');
        console.log(this.course);
        this.ajax.get('/getCourseList?courseNum='+this.course["courseNum"]).then(data=>{
            console.log(data);
            this.items = data;
        });
    }

    itemSelected(item) {
        console.log(item);
        this.navCtrl.push(Course, {
            item: item,
            course: this.course
        });
    }
}