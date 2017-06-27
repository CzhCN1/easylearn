import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Pretest } from '../pretest/pretest.component';
import { Introduction } from '../introduction/introduction.component';
import { UserInfo } from '../user/userInfo/userInfo.component';

import { AjaxService } from '../../services/ajax.service';

declare var wx: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [AjaxService]
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public ajax: AjaxService
  ) {

  }

  gotoPretest() {
    this.navCtrl.push(Pretest);
  }

  gotoIntroduction() {
    this.navCtrl.push(Introduction);
  }

  gotoUserInfo() {
    this.navCtrl.push(UserInfo);
  }

  share() {
    console.log("ajax post");
    this.ajax.post("/exchangeBonus",{signature:"czh"}).then(data=>{console.log(data)});
    // wx.getNetworkType({
    //   success: function (res) {
    //     var networkType = res.networkType; // 返回网络类型2g，3g，4g，wifi
    //     console.log(networkType);
    //   },
    //   fail: function(err){
    //     console.log(err);
    //   }
    // });
  }
}
