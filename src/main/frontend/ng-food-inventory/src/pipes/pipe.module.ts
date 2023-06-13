import { NgModule } from '@angular/core';

import * as Pipes from '.';

const pipes = [
  Pipes.ActiveItemsPipe,
  Pipes.DisplayDatePipe,
  Pipes.InactiveItemsPipe,
  Pipes.SearchFilterPipe
];

@NgModule({
    imports: [...pipes],
    providers: pipes,
    exports: pipes
})
export class PipeModule { }
