import { Component,OnInit  } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
    selector: 'testResult',
    templateUrl: 'testResult.component.html'
})

export class TestResult implements OnInit{
    choices: String[];
    answer: String[];
    score: Number;
    courseType: String;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.choices = navParams.get('radioChoices');
        this.answer = navParams.get('answer');
    }

    ngOnInit() {
        this.score = this.calculationa(this.choices,this.answer);
        if(this.score >= 8){
            this.courseType = "微基础";
        }else{
            this.courseType = "零基础";
        }
    }

    //计算得分
    calculationa(choices: String[],answer:String[]){
        let count = 0;
        for(let i = 0; i < answer.length; i++){
            if(choices[i] === answer[i]){
                count++;
            }    
        }
        return count;
    }
}