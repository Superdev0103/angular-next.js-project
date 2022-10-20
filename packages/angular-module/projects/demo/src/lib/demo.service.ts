import { Injectable } from '@angular/core';
import { Subject, scan, startWith } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DemoService {
  add$ = new Subject<number>();
  value$ = this.add$.pipe(startWith(0), scan((a, v) => a + v, 0));

  constructor() { }
}
