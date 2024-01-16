import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUsuario, Login, Usuario } from 'src/app/models';
import { IToken } from 'src/app/models/autenticacaoModelo/itoken';
import * as baseUrl from 'src/config/api';


const service = {
  name: 'Usuario',
  url: 'usuario',
}


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  API_URL = (baseUrl.baseUrl.includes("/api/")  ? baseUrl.baseUrl: baseUrl.baseUrl + 'api/') + service.url;
  constructor(
    private http: HttpClient,
  ) { }

  async obterPorId() {
    const endpoint = this.API_URL + '/obterPorId';
    return this.http.get<IUsuario>(endpoint).toPromise().then(response => response ? new Usuario(response) : null);
  }

  async manter(usuario: Usuario) {
    const endpoint = this.API_URL + '/manter';
    return this.http.post<IToken>(endpoint, usuario).toPromise().then(response => response && response.token ? localStorage.setItem('token', response.token) : localStorage.removeItem('token'));
  }

  async alterarUsuario(usuario: Usuario) {
    const endpoint = this.API_URL + '/alterarUsuario';
    return this.http.post<IUsuario>(endpoint, usuario).toPromise().then(response => response ? new Usuario(response) : null);
  }

  async login(login: Login) {
    const endpoint = this.API_URL + '/login';
    return this.http.post<IToken>(endpoint, login).toPromise().then(response =>  response && response.token ? localStorage.setItem('token', response.token) : localStorage.removeItem('token'));
  }

  async loginComToken() {
    const endpoint = this.API_URL + '/loginComToken';
    return this.http.get<IToken>(endpoint).toPromise().then(response =>  response && response.token ? localStorage.setItem('token', response.token) : localStorage.removeItem('token'));
  }

}