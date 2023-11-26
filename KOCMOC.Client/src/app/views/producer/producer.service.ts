import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producer } from 'src/app/models/entities/producer';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ProducerService {
  private apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getAllProducers(): Observable<Producer[]> {
    return this.http.get<Producer[]>(`${this.apiBaseUrl}/producer`);
  }

  getProducerById(id: number): Observable<Producer> {
    return this.http.get<Producer>(`${this.apiBaseUrl}/producer/${id}`);
  }

  addProducer(producer: Producer): Observable<Producer> {
    return this.http.post<Producer>(`${this.apiBaseUrl}/producer`, producer);
  }
  
  updateProducer(id: number, producer: Producer): Observable<any> {
    return this.http.put(`${this.apiBaseUrl}/producer/${id}`, producer);
  }

  deleteProducer(id: number): Observable<any> {
    return this.http.delete(`${this.apiBaseUrl}/producer/${id}`);
  }
}
