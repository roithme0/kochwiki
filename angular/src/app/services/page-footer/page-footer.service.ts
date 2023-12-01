import { Injectable } from '@angular/core';
import { FooterButton } from '../../interfaces/footer-button';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PageFooterService {
  private buttonsSubject = new BehaviorSubject<FooterButton[]>([]);
  buttons$ = this.buttonsSubject.asObservable();

  constructor() {}

  setButtons(buttons: FooterButton[]) {
    this.buttonsSubject.next(buttons);
  }
}
