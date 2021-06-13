import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'appAge'
})
export class AgePipe implements PipeTransform {
  transform(value: Date): number {
    return ~~((Date.now() - Number(value)) / (31557600000));
  }
}
