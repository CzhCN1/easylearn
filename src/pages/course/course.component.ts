import { Component, Input } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';

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
    subSrc: String;    //播放的子音频src
    _audio: any;
    _audioSub: any; //用于播放子语音
    durationList: String[] = [];
    durationMap: any;
    startTime: any;
    recordBtnWord: String = "按住提交作业";
    recordToast: any;
    isPlayed: any;
    chapterNum: String;
    openId: String;
    audioList: any;
    isContinued: Boolean = false;
    playWay: any = 0;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public ajax: AjaxService,
        public alertCtrl: AlertController,
        public toastCtrl: ToastController
    ) {
        this._audio = document.createElement('audio');
        this._audio.autoplay = false;
        this._audio.preload = "auto";
        this._audio.onended = this.end();
        
        this._audioSub = document.createElement('audio');
        this._audioSub.onended = this.subEnd;

        //获取上层组建传来的参数
        this.course = navParams.get('course');
        this.item = navParams.get('item');
        //获取从url携带的参数
        var urlNum = navParams.get('chapterNum');
        this.openId = navParams.get('openId');
        
        //如果是从课程列表进入的课程
        if(urlNum == undefined){
            this.chapterNum = this.item["chapterNum"];
        }else{
        //如果是从链接进入的课程
            this.chapterNum = urlNum;
            this.course = {};
            //根据chapterNum查courseNum,再去查到课程信息
            this.ajax.get('/getIntroductionByChapter?chapterNum=' + this.chapterNum).then(data=>{
                console.log(data);
                this.course = data;
            });
        }

        //用于记录语音是否播放过
        //10行5列的一个二维数组
        let isPlayedMap = [];
        for(let i = 0; i < 10; i++){
            isPlayedMap.push([].fill.call(new Array(5),false));
        }
        this.isPlayed = isPlayedMap;

        //获取详细的课程内容
        this.detail = [];
        var courseDetailUrl = "";
        if(this.openId){
            courseDetailUrl = "/getCourseDetail?chapterNum=" + this.chapterNum + "&openId=" + this.openId;
        }else{
            courseDetailUrl = "/getCourseDetail?chapterNum=" + this.chapterNum;
        }

        let self = this;

        //获取课程详细内容
        this.ajax.get(courseDetailUrl).then(function(data: Array<Object>){
            console.log(data);
            self.detail = data;
            //将所有的主音频遍历汇总加入数组
            let audioList = [];
            for(let sectionItem of data){
                for(let audioItem of sectionItem["audioList"]){
                    audioList.push(audioItem["audioSrc"]);
                }
            }
            self.audioList = audioList;
            //预加载元数据
            self.preload();
        });

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

    //离开页面时关掉正在播放的语音
    ionViewWillLeave(){
        console.log("leave");
        this.curSrc = "";
        this._audio.src = "";
    }

    playClick(audioItem,sectionIdx,audioIdx) {
        //暂停
        if (this._audio.currentSrc == audioItem && this._audio.paused === false) {
            this._audio.pause();
            this.isContinued = false;
        } else if (this._audio.currentSrc == audioItem && this._audio.paused === true) {
        //继续播放
            // this._audio.currentTime = 0;
            this._audioSub.pause();
            this._audioSub.src= "";
            this.subSrc = "";

            this._audio.play();
        } else {
        //播放
            let audioList = this.audioList;
            let curIdx = audioList.indexOf(audioItem);
            //如果是主段落音频，去除红点标记
            if(curIdx != -1){
                console.log("主音频播放");
                this._audioSub.pause();
                this._audioSub.src= "";
                this.subSrc = "";

                this._audio.src = audioItem;
                this.curSrc = audioItem;
                this._audio.play();
                this.isPlayed[sectionIdx][audioIdx] = true;
            }else{
            //如果是非主音频，点击暂停全局播放。
                this._audio.pause();
                this._audioSub.src = audioItem;
                this.subSrc = audioItem;
                this._audioSub.play();
                this.isContinued = false;
                
            } 
        }

    }

    end() {
        let self = this;
        // return function(){
        //     let playWay = self.playWay;
        //     let audioList = self.audioList;
        //     let curSrc = self.curSrc;
        //     let curIdx = audioList.indexOf(curSrc);
        //     //单曲播放
        //     if(playWay == 0 || curIdx == -1){
        //         self.curSrc = "";
        //         self._audio.src = "";
        //         self._audio.currentTime = 0;
        //     }else if(playWay == 1){
        //     //连续播放
        //         if(curIdx !== audioList.length){
        //             let src = audioList[curIdx + 1];
        //             self.curSrc = src;
        //             self._audio.src = src;
        //             self._audio.play();
        //         }else{
        //             self.curSrc = "";
        //             self._audio.src = "";
        //         }
        //     }else if(playWay == 2){
        //     //循环播放
        //         self._audio.currentTime = 0;
        //         self._audio.play();
        //     }
        // }
        return function(){
            let isContinued = self.isContinued;
            let audioList = self.audioList;
            let curSrc = self.curSrc;
            let curIdx = audioList.indexOf(curSrc);
            //是否循环播放
            if(isContinued){
                //是否是最后一段
                if(curIdx !== (audioList.length - 1)){
                    let src = audioList[curIdx + 1];
                    self.curSrc = src;
                    self._audio.src = src;
                    self._audio.play();
                }else{
                    self.curSrc = "";
                    self._audio.src = "";
                }
            }else{
                self.curSrc = "";
            }
        }
        
    }

    subEnd() {
        var self = this;

        return function(){
            self.subSrc = "";
            self._audioSub.src = "";
        }
        
    }

    preload(){
        //防止出栈操作影响原数组
        var srcList = this.audioList.slice(0);
        var tempAudio = document.createElement('audio');
        tempAudio.autoplay = false;
        tempAudio.preload = "auto";
        tempAudio.src = srcList.shift();

        //元数据加载完毕回调
        tempAudio.onloadedmetadata = () => {
            // console.log(tempAudio.duration);
            let sec = Math.ceil(tempAudio.duration);
            let time = sec > 60 ?　( Math.floor(sec/60)) +"\'" + (sec % 60) +"\""　: (sec % 60) +"\"";
            this.durationList.push(time);
            // console.log(this.durationList);
            if(srcList.length>0){
                tempAudio.src = srcList.shift();
            }else{
                this.listToMap();
            }
        }
    }

    // duration一维数组转二维数组
    listToMap(){
        let sliceIdx = 0;
        let durationList = this.durationList;
        let durationMap = [];
        let audioData = this.detail;
        for(let section of audioData){
            let row = [];
            let rowLen = section["audioList"].length;
            row = durationList.slice(sliceIdx,sliceIdx + rowLen);
            durationMap.push(row);
            sliceIdx += rowLen;
        }
        this.durationMap = durationMap;
        console.log(durationMap);
    }

    preCourse(){
        this.ajax.get('/getPreviousChapter?chapterNum=' + this.chapterNum).then(data=>{
            console.log(data);
            var prev = data;
            if(prev["chapterNum"]){
                this.navCtrl.push(Course,{
                    item: prev,
                    course: this.course,
                    openId: this.openId
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

        // this.recordToast = this.toastCtrl.create({
        //     message: '正在录音',
        //     position: 'middle'
        //   });
        // this.recordToast.present();

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
        // this.recordToast.dismiss();
        wx.stopRecord({
            success: function (res) {
                var localId = res.localId;
                if(recordTime < 5){
                    alert("录音不足5秒");
                }else{
                    var postData = {};
                    var date = new Date();
                    postData["chapterNum"] = self.chapterNum;
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

                    // wx.playVoice({
                    //     localId: localId // 需要播放的音频的本地ID，由stopRecord接口获得
                    // });
                }
            }
        });
    }

    //是否循环播放？默认否
    continued(){
        let isContinued = !this.isContinued;
        //如果是循环播放状态
        if(isContinued){
            this._audioSub.pause();
            this._audioSub.src= "";
            this.subSrc = "";
            let audioList = this.audioList;
            let curSrc = this._audio.src;
            console.log(curSrc);
            // 如果未播放过，从第一段开始
            if(!curSrc || curSrc == undefined || curSrc == ""){
                console.log(audioList[0]);
                this.curSrc = audioList[0];
                this._audio.src = audioList[0];
                this._audio.play();
            }else{
                let curIdx = audioList.indexOf(curSrc);
                //如果是主音频 已暂停并且播放完，播放下一段
                if(curIdx != -1 && this._audio.paused && this._audio.ended){
                    this.curSrc = audioList[curIdx+1];
                    this._audio.src = audioList[curIdx+1];
                }else{

                }
                this._audio.play();
            }
        //如果是暂停状态
        }else{
            this._audio.pause();
        }
        this.isContinued = !this.isContinued;
        
        /**
         * 0: 播放结束后暂停
         * 1: 连续播放
         * 2: 循环播放
         */
        // let playWay = this.playWay;
        // console.log(playWay);
        // if(playWay < 2){
        //     this.playWay = playWay + 1;
        // }else{
        //     this.playWay = 0;
        // }
    }
}