import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TestWelcome } from '../pages/pretest/testWelcome.component';
import { UserInfo } from '../pages/user/userInfo/userInfo.component';
import { Bonus } from '../pages/user/bonus/bonus.component';
import { Introduction } from '../pages/introduction/introduction.component';
import { Homework } from '../pages/user/homework/homework.component';

import { PretestModule } from '../pages/pretest/pretest.module';
import { IntroductionModule } from '../pages/introduction/introduction.module';
import { CourseModule } from '../pages/course/course.module';
import { UserModule } from '../pages/user/user.module';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      mode: 'ios'
    }, {
      links: [
        { component: HomePage, name: 'Home', segment: 'home'},
        { component: TestWelcome, name: 'Pretest', segment: 'pretest'},
        { component: UserInfo, name: 'UserInfo', segment: 'user'},
        { component: Bonus, name: 'Bonus', segment: 'bonus'},
        { component: Introduction, name: 'Introduction', segment: 'introduction'},
        { component: Homework, name: 'Homework', segment: 'homework'}
      ]
    }),
    HttpModule,
    PretestModule,
    IntroductionModule,
    CourseModule,
    UserModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
