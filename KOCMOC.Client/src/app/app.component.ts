import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'KOCMOC.Client';

  message = '';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getHelloWorld().subscribe(data => {
      this.message = data;
    }, error => {
      console.error('Error fetching data: ', error);
    });
  }
}
