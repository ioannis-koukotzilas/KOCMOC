import { Component, OnInit } from "@angular/core";
import { Producer } from "src/app/models/entities/producer";
import { ProducerService } from "../producer.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-producer-list',
  templateUrl: './producer-list.component.html',
  styleUrls: ['./producer-list.component.css']
})
export class ProducerListComponent implements OnInit {
  producers: Producer[] = [];

  constructor(private router: Router, private producerService: ProducerService) {}

  ngOnInit(): void {
    this.loadProducers();
  }

  loadProducers() {
    this.producerService.getAllProducers().subscribe({
      next: (data) => this.producers = data,
      error: (err) => console.error(err)
      // Ideally, handle errors more gracefully
    });
  }

  createNew() {
    this.router.navigate(['/producer/edit', 0]); // Using '0' or a similar identifier for new entries
  }
}