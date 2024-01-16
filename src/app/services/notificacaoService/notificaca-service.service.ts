import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { INotificacao, Notificacao } from 'src/app/models';
import { Candidatura } from 'src/app/models/vagaModelo';


const service = {
  name: 'Notificacao',
  url: 'notificacao',
}

@Injectable({
  providedIn: 'root'
})
export class NotificacaService {

  API_URL = "http://localhost:8085/" + service.url;

  constructor(
    private http: HttpClient,
    private readonly snackBar: MatSnackBar,
  ) { }

  async obterListaPorContratante() {
    const endpoint = this.API_URL + '/obterListaPorContratante';
    return this.http.get<INotificacao[]>(endpoint).toPromise().then(response => response ? response.map(value => new Notificacao(value)) : null);
  }

  async obterListaPorCandidato() {
    const endpoint = this.API_URL + '/obterListaPorCandidato';
    return this.http.get<INotificacao[]>(endpoint).toPromise().then(response => response ? response.map(value => new Notificacao(value)) : null);
  }

  async manter(candidatura: Candidatura) {
    const endpoint = this.API_URL + '/manter';
    return this.http.post<any>(endpoint, candidatura).toPromise().then(response => response && response.mensagem ? this.snackBar.open(response.mensagem, undefined, {
      duration: 3000
    }) : null);
  }

  async alterar(notificacao: Notificacao) {
    const endpoint = this.API_URL + '/alterar';
    return this.http.post<any>(endpoint, notificacao).toPromise().then(response => response && response.mensagem ? this.snackBar.open(response.mensagem, undefined, {
      duration: 3000
    }) : null);
  }

}
