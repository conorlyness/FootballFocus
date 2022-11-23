import { Pipe, PipeTransform } from '@angular/core';

const ordinals: string[] = ['th', 'st', 'nd', 'rd'];

@Pipe({
  name: 'ordinal',
})
export class OrdinalPipe implements PipeTransform {
  transform(number: number): string {
    let value = number % 100;
    return (
      number + (ordinals[(value - 20) % 10] || ordinals[value] || ordinals[0])
    );
  }
}
