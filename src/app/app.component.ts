import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent, merge, Observable } from 'rxjs';
import { debounceTime, map, mapTo, tap } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  num!: number;
  title = 'pretest';
  type = 'isPrime';
  result!: boolean; 
  @ViewChild('input') input!: ElementRef<HTMLInputElement>;
  @ViewChild('typeselect') typeElm!: ElementRef;

  result$!: Observable<boolean>;



  ngAfterViewInit() {
    const inputElm$ =  fromEvent<Event>(this.input.nativeElement, 'input').pipe(map(event => {
      const target = (event.target as HTMLInputElement);
      let value = +target.value;
  
      if (!Number.isInteger(value)) {
        this.num = Math.round(value);
      }
  
      if (value < 0) {
        this.num = 1;
      }
  
      if (!value) {
        this.num = 0;
      }
      return this.num;
    }));
    const typeElm$ =   fromEvent(this.typeElm.nativeElement, 'change').pipe(map(()=>this.num));
    this.result$  = merge( inputElm$  ,typeElm$ ).pipe(map(val=>{
      if(this.type === 'isPrime') {
        return  this.isPrime(val);
      } else {
        return  this.isFibonacci(val);
      }
    }));
  }

  isPrime(num: number) {
    for (let i = 2; i < num; i++)
      if (num % i === 0) return false;
    return num > 1;
  }

  isFibonacci = (num: number) => {
    if (this.isSquare(5 * (num * num) - 4) || this.isSquare(5 * (num * num) + 4)) {
      return true;
    } else { return false; }
  };

  isSquare = (n: number) =>{
    return n > 0 && Math.sqrt(n) % 1 === 0;
  }

}
