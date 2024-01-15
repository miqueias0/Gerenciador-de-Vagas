import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IVaga, Vaga } from 'src/app/models/vagaModelo';
import * as baseUrl from 'src/config/api';

const service = {
  name: 'Vaga',
  url: 'vaga',
}

@Injectable({
  providedIn: 'root'
})
export class VagaService {

  API_URL = "http://localhost:8082/" + service.url;
  constructor(
    private http: HttpClient,
    private readonly snackBar: MatSnackBar,
  ) { }

  async obterPorId(id: string) {
    const endpoint = this.API_URL + '/obterPorId';
    return this.http.get<IVaga>(endpoint, { params: { id } }).toPromise().then(response => response ? new Vaga(response) : null);
  }

  async obterLista() {
    const endpoint = this.API_URL + '/obterLista';
    return this.http.get<IVaga[]>(endpoint).toPromise().then(response => response ? response.map(value => new Vaga(value)) : null);
  }

  async manter(vaga: Vaga) {
    const endpoint = this.API_URL + '/manter';
    return this.http.post<IVaga>(endpoint, vaga).toPromise().then(response => response ? new Vaga(response) : null);
  }

  async alterar(vaga: Vaga) {
    const endpoint = this.API_URL + '/alterar';
    return this.http.post<IVaga>(endpoint, vaga).toPromise().then(response => response ? new Vaga(response) : null);
  }

  async excluir(vaga: Vaga) {
    const endpoint = this.API_URL + '/excluir';
    return this.http.post<any>(endpoint, vaga).toPromise().then(result => result && result.mensagem ? this.snackBar.open(result.mensagem, undefined, {
      duration: 3000
    }) : null);
  }
}