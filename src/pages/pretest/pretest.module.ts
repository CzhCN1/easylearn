import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { Pretest } from './pretest.component';
import { TestWelcome } from './testWelcome.component';
import { Question } from './question.component';
import { TestResult } from './testResult.component';

@NgModule({
  declarations: [
    TestWelcome,
    Question,
    TestResult,
    Pretest
  ],
  imports: [IonicModule.forRoot(TestWelcome)],
  bootstrap: [IonicApp],
  entryComponents: [
    TestWelcome,
    Question,
    TestResult,
    Pretest
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ],
  exports: [IonicModule]
})
export class PretestModule {}
