import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Candidatura, ICandidatura } from 'src/app/models/vagaModelo';

const service = {
  name: 'Candidatura',
  url: 'candidatura',
}

@Injectable({
  providedIn: 'root'
})
export class CandidaturaService {

  API_URL = "http://localhost:8083/" + service.url;

  constructor(
    private http: HttpClient,
  ) { }


  async obterPorId() {
    const endpoint = this.API_URL + '/obterPorId';
    return this.http.get<ICandidatura>(endpoint).toPromise().then(response => response ? new Candidatura(response) : null);
  }

  async obterListaPorCandidatoId(candidatoId: string) {
    const endpoint = this.API_URL + '/obterListaPorCandidatoId';
    return this.http.get<ICandidatura[]>(endpoint, { params: { candidatoId } }).toPromise().then(response => response ? response.map(x => new Candidatura(x)) : null);
  }

  async obterListaPorVagaId(vagaId: string) {
    const endpoint = this.API_URL + '/obterListaPorVagaId';
    return this.http.get<ICandidatura[]>(endpoint, { params: { vagaId } }).toPromise().then(response => response ? response.map(x => new Candidatura(x)) : null);
  }

  async manter(candidatura: Candidatura) {
    const endpoint = this.API_URL + '/manter';
    return this.http.post<ICandidatura>(endpoint, candidatura).toPromise().then(response => response ? new Candidatura(response) : null);
  }

  async excluir(candidatura: Candidatura) {
    const endpoint = this.API_URL + '/excluir';
    return this.http.post<any>(endpoint, candidatura).toPromise();
  }
}
