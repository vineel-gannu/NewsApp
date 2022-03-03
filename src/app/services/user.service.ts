import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private subject = new Subject<any>();
  constructor() { }

  SendMessage(message) {
    this.subject.next(message);
  }

  ReceiveMessage():Observable<any> {
    return this.subject.asObservable();
  }
}
