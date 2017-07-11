import { Component, enableProdMode, Input, ViewChild } from '@angular/core';
import { NavController, NavParams, Events, Slides } from 'ionic-angular';

import { TestResult } from './testResult.component';

enableProdMode();

@Component({
  selector: 'question',
  templateUrl: 'question.component.html'
})
export class Question {
  @ViewChild('slides') slides: Slides;

  num: number = 1;
  wordQuestions: Object[];
  answer: String[];

  listenQuestions: any[];

  _audio: any;
  curSrc: String;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public eventCtrl: Events
  ) {
    this.wordQuestions = navParams.get('questions');
    this.answer = navParams.get('answer');
    this.listenQuestions = navParams.get('listenQuestions');

    this._audio = document.createElement('audio');
    this._audio.autoplay = false;
    this._audio.preload = "auto";
    this._audio.onended = this.end;
  }

  @Input() radioChoices: String[] = ['', '', '', '', '', '', '', '', '', ''];

  //提交答案
  submitAnswer() {
    console.log(this.radioChoices);
    this.navCtrl.push(TestResult, {
      radioChoices: this.radioChoices,
      answer: this.answer
    }).then(() => {
      const index = this.navCtrl.getActive().index;
      this.navCtrl.remove(index - 1);
    });
  }


  // Slide页面切换事件
  slideChange() {
    this._audio.src = "";
  }
  //播放结束
  end() {
    console.log("end");
    this.curSrc = "";
  }

  playClick(index) {
    //播放
    this._audio.src = this.listenQuestions[index].src;
    this.curSrc = this.listenQuestions[index].src;
    this._audio.play();
  }

  gotoLeft() {
    console.log("left");
    console.log(this.slides.slidePrev);
    this.slides.slidePrev();
    // if(!this.slides.isBeginning){
    //   console.log("not begin");
    //   this.slides.slidePrev();
    // }
  }

  gotoRight() {
    console.log("right");
    this.slides.slideNext();
    // if(!this.slides.isEnd){
    //   this.slides.slideNext();
    // }
  }
}
