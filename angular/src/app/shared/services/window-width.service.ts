import { Injectable, WritableSignal, signal, Signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WindowWidthService {
  private windowInnerWidth: WritableSignal<number> = signal(window.innerWidth);

  constructor() {
    window.addEventListener('resize', this.windowEventListener);
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.windowEventListener);
  }

  getWindowInnerWidth(): Signal<number> {
    return this.windowInnerWidth;
  }

  private windowEventListener = (): void => {
    this.windowInnerWidth.set(window.innerWidth);
  };
}
