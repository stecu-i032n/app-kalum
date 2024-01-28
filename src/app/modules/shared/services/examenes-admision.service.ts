import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';


const BASE_URL = `${environment.BASE_URL_KALUM_EXAMENES}/1`;

@Injectable({
  providedIn: 'root'
})
export class ExamenesAdmisionService {

  constructor(private http: HttpClient) { }


  getExamenes() {
    return this.http.get(`${BASE_URL}/examenes-admision`);
  }
}

