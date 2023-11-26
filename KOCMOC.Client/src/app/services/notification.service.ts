import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AppNotification } from '../models/interfaces/appNotification';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationSubject = new Subject<AppNotification>();
  notifications$ = this.notificationSubject.asObservable();

  show(message: string, duration = 3000) {
    const id = Math.random().toString(36).substring(2, 9);
    this.notificationSubject.next({ id, message });

    setTimeout(() => {
      this.notificationSubject.next({ id, message: '' });
    }, duration);
  }
}
