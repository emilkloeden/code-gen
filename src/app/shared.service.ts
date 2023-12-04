import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private inputTextSubject = new BehaviorSubject<string>('');
  $inputText$: Observable<string> = this.inputTextSubject.asObservable();

  setInputText(value: string) {
    this.inputTextSubject.next(value);
  }

}
