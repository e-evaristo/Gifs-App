import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gifs } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _apliKey: string = '';
  private _url: string = 'https://api.giphy.com/v1/gifs';
  private _history: string[] = [];
  public resultados: Gifs[] = [];

  constructor(private _http: HttpClient) {
    this._history = JSON.parse( localStorage.getItem('gifs_history')! ) || []; 
    //this.resultados = JSON.parse( localStorage.getItem('resultados')! ) || [];
    this._apliKey = JSON.parse( JSON.stringify(localStorage.getItem('api_key'))! ) || '';
  }

  get history() : string[] {
    return [...this._history];
  }

  searchGifs(query: string = ''): void {

    if (! this._apliKey) {
      alert('Falta a API KEY');
      return;
    }

    query = query.trim().toLowerCase();

    const params = new HttpParams()
      .set('api_key', this._apliKey)
      .set('limit','21')
      .set('q',query)

    if (query.trim().length <= 0) {
      return;
    }

    if (! this._history.includes(query)) {
      this._history.unshift(query);
      this._history = this._history.splice(0,12);
      
      localStorage.setItem('gifs_history', JSON.stringify(this._history));
      
    }

    this._http.get<SearchGifsResponse>(`${this._url}/search`, { params })
      .subscribe((response) => {
        this.resultados = response.data;
        //localStorage.setItem('resultados', JSON.stringify( this.resultados ));
      })
    
  }
}
