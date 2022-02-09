import { NgModule } from '@angular/core';

import * as Pipes from '.';

@NgModule({
  declarations: [
    Pipes.DisplayDatePipe
  ],
  imports: [],
  providers: [],
  bootstrap: [],
  exports: [
    Pipes.DisplayDatePipe
  ]
})
export class PipeModule { }
