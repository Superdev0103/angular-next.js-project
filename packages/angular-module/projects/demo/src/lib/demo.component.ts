import { Component, OnInit } from '@angular/core';
import { DemoService } from './demo.service';

@Component({
  selector: 'demo',
  template: `
    <p>Angular works!</p>
    <button mat-raised-button color="primary" (click)="service.add$.next(1)">Count in Angular</button>
  `,
  styles: [
    `
      :host {
        font-weight: bold;
      }
    `,
  ],
})
export class DemoComponent implements OnInit {
  constructor(public service: DemoService) {}

  ngOnInit(): void {}

  event: Event;
}
