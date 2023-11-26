import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AppNotification } from 'src/app/models/interfaces/appNotification';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  private unsubscribe$ = new Subject<void>();
  notifications: any[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.initNotifications();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  initNotifications(): void {
    this.notificationService.notifications$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (notification: AppNotification) => {
          if (notification.message) {
            this.notifications.push(notification);
          } else {
            this.notifications = this.notifications.filter(
              (notif) => notif.id !== notification.id
            );
          }
        },
        error: (err) => {
          console.error('Error in notification stream:', err);
        },
        complete: () => {
          console.log('Notification stream completed');
        },
      });
  }
}
