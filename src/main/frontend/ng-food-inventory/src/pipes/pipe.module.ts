import { NgModule } from '@angular/core';

import * as Pipes from '.';

const pipes = [
  Pipes.ActiveItemsPipe,
  Pipes.DisplayDatePipe,
  Pipes.InactiveItemsPipe,
  Pipes.SearchFilterPipe
];

@NgModule({
  declarations: pipes,
  providers: pipes,
  exports: pipes
})
export class PipeModule { }
