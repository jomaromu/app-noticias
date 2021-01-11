import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService implements OnInit {

  headlinesPage = 0;

  categoriaActual = '';
  categoriaPage = 0;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.getTopHeadlines();
  }

  private ejecutarQuery<T>(urlCorto: string){

    const query = `${apiUrl}${urlCorto}`;
    return this.http.get<T>(`${query}`, {headers: headers});
  }

  getTopHeadlines(){
    // return this.http.get<RespuestaTopHeadlines>(`http://newsapi.org/v2/top-headlines?country=us&apiKey=b3b5c2c57d4d4bb29417f74934a26e85`);

    this.headlinesPage++;
    // console.log(this.headlinesPage);
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&page=${this.headlinesPage}`);
  }

  getTopHeadlinesCategoria(categoria: string){
    // return this.http.get(`http://newsapi.org/v2/top-headlines?country=us&category=${categoria}&apiKey=b3b5c2c57d4d4bb29417f74934a26e85`);

    if (this.categoriaActual === categoria) {
      this.categoriaPage++;
    } else {
      this.categoriaPage = 1;
      this.categoriaActual = categoria;
    }

    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&category=${categoria}`);

  }
}
