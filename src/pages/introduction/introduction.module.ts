import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { Introduction } from './introduction.component';
import { Detail } from './detail/detail.component';
import { Buy } from './buy/buy.component';

@NgModule({
  declarations: [
    Introduction,
    Detail,
    Buy
  ],
  imports: [IonicModule.forRoot(Introduction)],
  bootstrap: [IonicApp],
  entryComponents: [
    Introduction,
    Detail,
    Buy
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ],
  exports: [IonicModule]
})
export class IntroductionModule {}
