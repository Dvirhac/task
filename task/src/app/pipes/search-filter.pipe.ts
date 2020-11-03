import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'searchFilter',
})
export class SearchFilterPipe implements PipeTransform {

  transform(states: string[], prefix: string) {
    if (!prefix) return states;
    return states.filter(v => {
      if (!v) return;
      return v.toLowerCase().indexOf(prefix.toLowerCase()) !== -1;
    });
  }

}
