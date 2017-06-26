import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { UserInfo } from './userInfo/userInfo.component';
import { Bonus } from './bonus/bonus.component';
@NgModule({
  declarations: [
    UserInfo,
    Bonus
  ],
  imports: [IonicModule.forRoot(UserInfo)],
  bootstrap: [IonicApp],
  entryComponents: [
    UserInfo,
    Bonus
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ],
  exports: [IonicModule]
})
export class UserModule {}
