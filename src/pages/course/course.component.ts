import { Component, Input } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { AjaxService } from '../../services/ajax.service';

declare var wx: any;

@Component({
    selector: 'course',
    templateUrl: 'course.component.html',
    providers: [AjaxService]
})
export class Course {
    course: Object;
    item: Object;
    detail: any;
    curId: Number;
    curSrc: String;
    _audio: any;
    durationList: String[] = [];
    startTime: any;
    recordBtnWord: String = "按住提交作业";

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public ajax: AjaxService,
        public alertCtrl: AlertController,
    ) {
        this._audio = document.createElement('audio');
        this._audio.autoplay = false;
        this._audio.preload = "auto";
        this._audio.onended = this.end;
        
        this.course = navParams.get('course');
        this.item = navParams.get('item');
        
        this.detail = [];

        this.ajax.get('/getCourseDetail?chapterNum='+this.item["chapterNum"]).then(data=>{
            console.log(data);
            this.detail = data;
            //预加载元数据
            this.preload();
        });
        
    }

    //离开页面时关掉正在播放的语音
    ionViewWillLeave(){
        console.log("leave");
        this.curSrc = "";
    }

    playClick(audioItem) {
        //暂停
        if (this._audio.currentSrc == audioItem && this._audio.paused === false) {
            this._audio.pause();
        } else if (this._audio.currentSrc == audioItem && this._audio.paused === true) {
        //重播
            this._audio.currentTime = 0;
            this._audio.play();
        } else {
        //播放
            this._audio.src = audioItem;
            this.curSrc = audioItem;
            this._audio.play();
        }

    }

    end() {
        console.log("end");
        this.curSrc = "";
    }

    preload(){
        var srcList = [];
        for(let i = 0; i < this.detail.length; i++){
            srcList.push(this.detail[i].audioPath);
        }
        var tempAudio = document.createElement('audio');
        tempAudio.autoplay = false;
        tempAudio.preload = "auto";
        tempAudio.src = srcList.pop();

        tempAudio.onloadedmetadata = () => {
            console.log(tempAudio.duration);
            let sec = Math.ceil(tempAudio.duration);
            let time = sec > 60 ?　( Math.floor(sec/60)) +"\'" + (sec % 60) +"\""　: (sec % 60) +"\"";
            this.durationList.push(time);
            console.log(this.durationList);
            if(srcList.length>0){
                tempAudio.src = srcList.pop();
            }
        }
    }

    preCourse(){
        var item = this.item;
        this.ajax.get('/getPreviousChapter?courseNum='+item["courseNum"]+'&chapterNum=' + item["chapterNum"]).then(data=>{
            console.log(data);
            var prev = data;
            if(prev["chapterNum"]){
                this.navCtrl.push(Course,{
                    item: prev,
                    course: this.course
                });
            }else{
                console.log("没有前一节课程");
            }
        });
    }

    recodStart($event){
        $event.preventDefault();
        console.log("record start");
        var date = new Date();
        this.startTime = date.getTime();

        this.recordBtnWord = "录音中";
        //开始录音
        wx.startRecord();
        return false;
    }

    recordEnd(e){
        this.recordBtnWord = "按住提交作业";
        console.log("record end");
        var date = new Date();
        var endTime = date.getTime();
        var recordTime = (endTime - this.startTime)/1000;
        
        var self = this;

        wx.stopRecord({
            success: function (res) {
                var localId = res.localId;
                if(recordTime < 5){
                    alert("录音不足5秒");
                }else{
                    var postData = {};
                    var date = new Date();
                    postData["chapterNum"] = self.item["chapterNum"];
                    postData["timetamp"] = date.getTime();
                    postData["localId"] = localId; 

                    self.ajax.post("/uploadVoice",postData).then(data=>{
                        let alert  = self.alertCtrl.create({
                            title: "成功",
                            subTitle: "作业提交成功！",
                            buttons: ["ok"]
                        });
                        alert.present();
                    })

                    wx.playVoice({
                        localId: localId // 需要播放的音频的本地ID，由stopRecord接口获得
                    });
                }
            }
        });
        
    }
}