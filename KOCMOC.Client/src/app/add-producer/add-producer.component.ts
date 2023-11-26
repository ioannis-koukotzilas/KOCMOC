import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-add-producer',
  templateUrl: './add-producer.component.html',
  styleUrls: ['./add-producer.component.css']
})
export class AddProducerComponent {
  producer = {
    name: '',
    description: ''
    // other fields...
  };

  constructor(private apiService: ApiService) { }

  onSubmit() {
    this.apiService.addProducer(this.producer).subscribe(result => {
      console.log(result);
      // Handle result...
    });
  }
}
