import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'custom'
})
export class CustomPipe implements PipeTransform {

  transform(value: string, ...args: any[]): string {
    // Example: transform the input string to uppercase
    return value.toUpperCase();
  }

}
