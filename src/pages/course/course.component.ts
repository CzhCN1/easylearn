import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
    selector: 'course',
    templateUrl: 'course.component.html'
})
export class Course {
    course: Object;
    item: Object;
    detail: Object[];
    curId: Number;
    curSrc: String;
    _audio: any;
    durationList: String[] = [];

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams
    ) {
        this._audio = document.createElement('audio');
        this._audio.autoplay = false;
        this._audio.preload = "auto";
        this._audio.onended = this.end;


        this.preload();

        this.course = {
            courseTitle: "【说乎】试听课",
            subTitle: "Jinx老师——前新东方首席口语名师",
            headImg: "assets/img/head.png",
            courseImg: "http://i1.hdslb.com/u_user/19668ac7dcf075d2a76c9b144dee7780.jpg",
            description: "20天，让你的日语听得懂，说得出こんにちは！",
            date: "2017-5-8"
        };
        this.item = navParams.get('item');

        this.detail = [
            {
                title: '今日主题：机场',
                img: 'assets/img/course1.jpg',
                mainAudio: 'http://jsdx.sc.chinaz.com/Files/DownLoad/sound1/201705/8684.mp3',
                audioContent: [
                    {
                        content: "word [wɜ:d] n.单词;话语;诺言;消息",
                        audioSrc: "http://jsdx.sc.chinaz.com/Files/DownLoad/sound1/201705/8685.mp3"
                    },
                    {
                        content: "word [wɜ:d] n.单词;话语;诺言;消息",
                        audioSrc: "http://jsdx.sc.chinaz.com/Files/DownLoad/sound1/201705/8686.mp3"
                    }
                ]
            },
            {
                title: '万能句式',
                img: 'assets/img/course1.jpg',
                mainAudio: 'http://jsdx.sc.chinaz.com/Files/DownLoad/sound1/201705/8687.mp3',
                audioContent: [
                    {
                        content: "word [wɜ:d] n.单词;话语;诺言;消息",
                        audioSrc: "http://jsdx.sc.chinaz.com/Files/DownLoad/sound1/201705/8688.mp3"
                    },
                    {
                        content: "word [wɜ:d] n.单词;话语;诺言;消息",
                        audioSrc: "http://jsdx.sc.chinaz.com/Files/DownLoad/sound1/201705/8689.mp3"
                    }
                ]
            },
            {
                title: '必背单词',
                img: 'assets/img/course1.jpg',
                mainAudio: 'http://jsdx.sc.chinaz.com/Files/DownLoad/sound1/201705/8680.mp3',
                audioContent: [
                    {
                        content: "word [wɜ:d] n.单词;话语;诺言;消息",
                        audioSrc: "http://jsdx.sc.chinaz.com/Files/DownLoad/sound1/201705/8681.mp3"
                    }
                ]
            }
        ];
    }


    // play(audioItem) {
    //     this.curId = this.allTracksStrArr.indexOf(audioItem);
    //     this.curSrc = audioItem;
    // }

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
        var srcList = [
            'http://jsdx.sc.chinaz.com/Files/DownLoad/sound1/201705/8687.mp3',
            'http://jsdx.sc.chinaz.com/Files/DownLoad/sound1/201705/8687.mp3',
            'http://jsdx.sc.chinaz.com/Files/DownLoad/sound1/201705/8687.mp3'
        ];

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
}