import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { UserInfo } from './userInfo/userInfo.component';
import { Bonus } from './bonus/bonus.component';
import { Homework } from './homework/homework.component';

@NgModule({
  declarations: [
    UserInfo,
    Bonus,
    Homework
  ],
  imports: [IonicModule.forRoot(UserInfo)],
  bootstrap: [IonicApp],
  entryComponents: [
    UserInfo,
    Bonus,
    Homework
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ],
  exports: [IonicModule]
})
export class UserModule {}
