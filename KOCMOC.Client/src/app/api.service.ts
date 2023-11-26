import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:5203/api/producer'; // Adjust the URL based on your API

  constructor(private http: HttpClient) { }

  getProducers(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addProducer(producer: any) {
    return this.http.post(this.apiUrl, producer);
  }
}