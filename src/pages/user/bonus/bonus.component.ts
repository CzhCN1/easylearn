import { Component, Input } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

@Component({
    selector: 'bonus',
    templateUrl: 'bonus.component.html'
})
export class Bonus {

    currentChoice: String;
    exchangeItems: Object[];

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public alertCtrl: AlertController
    ) {
        this.currentChoice = 'pay';
        this.exchangeItems = [
            {day: 3,  bonus: 800},
            {day: 7,  bonus: 1600},
            {day: 16, bonus: 3200},
            {day: 35, bonus: 6400},
            {day: 80, bonus: 12800}
        ];
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