import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

import { AjaxService } from '../services/ajax.service';

declare var wx: any;

@Component({
  templateUrl: 'app.html',
  providers: [AjaxService]
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public ajax: AjaxService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      console.log(location.href.split('#')[0]);
      this.ajax.get('/getJsTicket?url=' + location.href.split('#')[0]).then(data => {
        console.log(data);
        data["debug"] = false;
        data["jsApiList"] = ["getNetworkType","onMenuShareTimeline", "startRecord", "stopRecord", "onVoiceRecordEnd", "playVoice", "pauseVoice", "stopVoice", "onVoicePlayEnd", "chooseWXPay"];
        wx.config(data);

        wx.ready(function () {
          console.log("ready");
        });

        wx.error(function () {
          console.log("error");
        });
      });
    });
  }
}

