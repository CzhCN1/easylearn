import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
    selector: 'buy',
    templateUrl: 'buy.component.html'
})
export class Buy {
    course: Object;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams
    ) {
        this.course = navParams.get('course');
    }

}