import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { Question } from './question.component';

import { AjaxService } from '../../services/ajax.service';
declare var wx: any;
@Component({
    selector: 'testWelcome',
    templateUrl: 'testWelcome.component.html',
    providers: [AjaxService]
})
export class TestWelcome {

    wordQuestions: any;
    listenQuestions: any;
    answer: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public modalCtrl: ModalController,
        public ajax: AjaxService
    ) {
        this.wordQuestions = [];
        this.listenQuestions = [];
        this.answer = [];
        wx.showAllNonBaseMenuItem();
    }

    startTest() {
        this.wordQuestions = [];
        this.listenQuestions = [];
        this.answer = [];
        
        this.ajax.get("/getQuestions").then(data=>{
            console.log(data);
            this.dealData(data);
            this.navCtrl.push(Question, {
                questions: this.wordQuestions,
                listenQuestions: this.listenQuestions,
                answer: this.answer
            });
        });
        
        //跳转至问题详细页面，并传入问题对象数组
        // this.navCtrl.push(Question, {
        //     questions: [
        //         { type: "choice", word: "shop", choices: ["饭店", "商店", "饮品", "衣服"] },
        //         { type: "choice", word: "zoo", choices: ["动物园", "商店", "饮品", "衣服"] }
        //     ],
        //     listenQuestions: [{
        //         src: 'http://jsdx.sc.chinaz.com/Files/DownLoad/sound1/201705/8684.mp3',
        //         artist: 'John Mayer',
        //         title: 'Why Georgia',
        //         preload: 'metadata',
        //         choices: ["饭店", "商店", "饮品", "衣服"]
        //     },
        //     {
        //         src: 'http://7xk5u3.com1.z0.glb.clouddn.com/%E7%8E%8B%E7%9D%BF%20-%20%E6%88%91%E4%BB%AC%E5%88%B0%E6%9C%80%E5%90%8E%E7%BB%88%E4%BA%8E%E5%8F%98%E6%88%90%E6%9C%8B%E5%8F%8B.mp3',
        //         artist: 'John Mayer',
        //         title: 'Why Georgia',
        //         preload: 'metadata',
        //         choices: ["饭店", "商店", "饮品", "衣服"]
        //     }],
        //     answer: ['A', 'B']
        // })
    }

    //处理后端传回的数据
    dealData(data){
        for(let item of data){
            this.answer.push(item.answer);
            if(item.type == "word"){
                let tempObj = {};
                tempObj["word"] = item.question;
                tempObj["choices"] = [item.choiceA,item.choiceB,item.choiceC,item.choiceD];
                this.wordQuestions.push(tempObj);
            }else{
                let tempObj = {};
                tempObj["src"] = item.question;
                tempObj["choices"] = [item.choiceA,item.choiceB,item.choiceC,item.choiceD];
                this.listenQuestions.push(tempObj);
            }
        }
        console.log(this.wordQuestions);
        console.log(this.listenQuestions);
        console.log(this.answer);
    }
}
