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
    exchangeItems: any;
    ownBonus: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public alertCtrl: AlertController,
        public ajax: AjaxService
    ) {
        this.currentChoice = 'pay';
        // this.exchangeItems = [
        //     {day: 3,  bonus: 800},
        //     {day: 7,  bonus: 1600},
        //     {day: 16, bonus: 3200},
        //     {day: 35, bonus: 6400},
        //     {day: 80, bonus: 12800}
        // ];

        this.ownBonus = {};
        this.ajax.get("/getUserBonus").then(data=>{
            this.ownBonus = data;
        });

        this.exchangeItems = [];
        this.ajax.get("/getBonusList").then(data=>{
            this.exchangeItems = data;
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
                        if(target["bonus"] > this.ownBonus["bonus"]){
                            //如果积分不足，不向后台发送请求。
                            console.log("积分不足");
                            let alert = this.alertCtrl.create({
                                title: '失败',
                                subTitle: '抱歉，您的积分不足。',
                                buttons: ['OK']
                            });
                            alert.present();
                        }else{
                            let postData = {
                                exchangeItem:target["bonus"],
                                exchangeDay: target["day"]
                            };
                            /**
                             * 发送兑换请求
                             */
                            this.ajax.post("/exchangeBonus",postData).then(data=>{
                                if(data["success"]){
                                    let alert = this.alertCtrl.create({
                                        title: '成功',
                                        subTitle: '您已成功使用积分兑换课程有效期。',
                                        buttons: ['OK']
                                    });
                                    alert.present();
                                    this.ownBonus["bonus"] = this.ownBonus["bonus"] - target["bonus"];
                                }else{
                                    let alert = this.alertCtrl.create({
                                        title: '失败',
                                        subTitle: data["result"],
                                        buttons: ['OK']
                                    });
                                    alert.present();
                                }
                            });
                        }
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