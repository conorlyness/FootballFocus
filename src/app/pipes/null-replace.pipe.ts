import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nullReplace',
})
export class NullReplacePipe implements PipeTransform {
  transform(value: number | string | undefined) {
    return value ? value : 0;
  }
}
