import { DoBootstrap, NgModule } from '@angular/core';
import { BrowserModule, } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { DemoComponent } from './demo.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [DemoComponent],
  imports: [BrowserModule, BrowserAnimationsModule, MatButtonModule],
  entryComponents: [DemoComponent],
})
export class DemoModule implements DoBootstrap {
  ngDoBootstrap() {}
}
