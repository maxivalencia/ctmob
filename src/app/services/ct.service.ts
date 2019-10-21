import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Typescript custom enum for search types (optional)
export enum SearchType {
  all = ''
}

@Injectable({
  providedIn: 'root'
})
export class CtService {
  url = 'http://192.168.88.254:2053/index.php/controles_techniques/one_visite/';
  apiKey = ''; // <-- Enter your own key here!
  public theTodo: any;

  constructor(private http: HttpClient) { }


  searchData(title: string): Observable<any> {
    /* return this.http.get(`${this.url}?IMM=${encodeURI(title)}`).pipe(
      map(results => results['Search'])
    ); */    
    /* this.http.get('http://192.168.88.254:2053/index.php/controles_techniques/one_visite/?IMM=' + title).subscribe(data => {
      this.theTodo = data;
      return this.theTodo;
    }) */
    //console.log(this.theTodo);
    let response = this.http.get('http://192.168.88.254:2053/index.php/controles_techniques/one_visite/?IMM=' + title);
    return response;
  }

  
  getDetails(id) {
    return this.http.get(`${this.url}?i=${id}&plot=full&apikey=${this.apiKey}`);
  }
}
