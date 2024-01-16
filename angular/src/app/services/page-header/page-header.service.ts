import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PageHeaderService {
  private headlineSubject = new BehaviorSubject<string>('');
  private backSubject = new BehaviorSubject<string>('');
  headline$ = this.headlineSubject.asObservable();
  back$ = this.backSubject.asObservable();

  setHeadline(headline: string) {
    this.headlineSubject.next(headline);
  }

  setBack(back: string) {
    this.backSubject.next(back);
  }
}
