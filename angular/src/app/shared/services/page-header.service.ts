import { Injectable, WritableSignal, Signal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PageHeaderService {
  private headline: WritableSignal<string> = signal('');
  private back: WritableSignal<string> = signal('');

  setHeadline(headline: string): void {
    this.headline.set(headline);
  }

  setBack(back: string): void {
    this.back.set(back);
  }

  getHeadline(): Signal<string> {
    return this.headline;
  }

  getBack(): Signal<string> {
    return this.back;
  }
}
