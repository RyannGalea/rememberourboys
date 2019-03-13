import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({name: 'Highlight'})
export class HighlightPipe implements PipeTransform {

  constructor() { }

  transform(val, arg): any {

    if (!arg) { return val; }

    val = val.toLowerCase();
    arg = arg.toLowerCase();

    const str = _.replace(val, arg, `<span>${arg}</span>`);
    console.log('str:', str);

    return str;


  }

}
