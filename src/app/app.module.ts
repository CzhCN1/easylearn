import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Pretest } from '../pages/pretest/pretest.component';
// import { Question } from '../pages/pretest/question.component';
// import { TestResult } from '../pages/pretest/testResult.component';

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
        { component: Pretest, name: 'Pretest', segment: 'pretest', defaultHistory: [HomePage]}
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
