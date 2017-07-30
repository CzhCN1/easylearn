import { Component, Input } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { AjaxService } from '../../../services/ajax.service';

declare var wx: any;

@Component({
    selector: 'homework',
    templateUrl: 'homework.component.html',
    providers: [AjaxService]
})

export class Homework {
    homeworks: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public alertCtrl: AlertController,
        public ajax: AjaxService
    ) {
        this.homeworks = [];

        var self = this;
        this.ajax.get("/getUserHomework").then(function(data: Array<Object>){
            for(let item of data){
                item["date"] = self.timeFormat(item["timetamp"]);
            }
            self.homeworks = data;
        
        });
    }

    timeFormat(timetamp){
        var date = new Date();
        var num = Number.parseInt(timetamp);
        date.setTime(num);
        var res = date.getFullYear()+"年"+(date.getMonth()+1)+"月"+date.getDate()+"日";
        return res;
    }

    //点击播放对应的作业语音
    itemSelected(item){
        wx.playVoice({
            localId: item["localId"] // 需要播放的音频的本地ID，由stopRecord接口获得
        });
    }
}