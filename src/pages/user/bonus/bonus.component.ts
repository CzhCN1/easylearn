import { Component, Input } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { AjaxService } from '../../../services/ajax.service';

@Component({
    selector: 'bonus',
    templateUrl: 'bonus.component.html',
    providers: [AjaxService]
})
export class Bonus {

    currentChoice: String;
    exchangeItems: Object[];
    ownBonus: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public alertCtrl: AlertController,
        public ajax: AjaxService
    ) {
        this.currentChoice = 'pay';
        this.exchangeItems = [
            {day: 3,  bonus: 800},
            {day: 7,  bonus: 1600},
            {day: 16, bonus: 3200},
            {day: 35, bonus: 6400},
            {day: 80, bonus: 12800}
        ];

        this.ownBonus = {};
        this.ajax.get("/getUserBonus").then(data=>{
            this.ownBonus = data;
        });
    }

    exchange(index) {
        let target = this.exchangeItems[index];

        let confirm = this.alertCtrl.create({
            title: "积分兑换",
            message: "您确认要使用"+ target["bonus"] +"积分兑换"+target["day"]+"天课程有效期吗?",
            buttons: [
                {
                    text: "确认",
                    handler: () => {
                        console.log("确认");
                    }
                },
                {
                    text: "取消",
                    handler: () => {
                        console.log("取消");
                    }
                }
            ]
        });
        confirm.present();
    }

}