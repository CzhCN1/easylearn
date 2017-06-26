import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Question } from './question.component';
import { TestWelcome } from './testWelcome.component';
import { TestResult } from './testResult.component';

@Component({
  templateUrl: 'pretest.component.html'
})
export class Pretest {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) { }
}
