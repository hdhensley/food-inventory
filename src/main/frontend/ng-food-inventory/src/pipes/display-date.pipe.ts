import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'displayDate',
    standalone: true
})
export class DisplayDatePipe implements PipeTransform {

  transform(date: Date|string|null): string {
    return date ? new Date(date).toLocaleDateString() : '';
  }

}
