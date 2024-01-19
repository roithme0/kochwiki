import { Injectable, WritableSignal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PageHeaderService {
  headline: WritableSignal<string> = signal('');
  back: WritableSignal<string> = signal('');
}
