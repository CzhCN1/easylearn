import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { Course } from './course.component';

@NgModule({
  declarations: [
    Course
  ],
  imports: [IonicModule.forRoot(Course)],
  bootstrap: [IonicApp],
  entryComponents: [
    Course
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ],
  exports: [IonicModule]
})
export class CourseModule {}
