import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CadastrarComponent } from 'src/app/cadastrar/cadastrar.component';
import { Usuario } from 'src/app/models';
import { Vaga } from 'src/app/models/vagaModelo';
import { UsuarioService, VagaService } from 'src/app/services';

@Component({
  selector: 'app-hub',
  templateUrl: './hub.component.html',
  styleUrls: ['./hub.component.scss']
})
export class HubComponent implements OnInit {

  listaVagas: Vaga[] | null = [];

  private _usuario: Usuario | null = null;
  public get usuario() { return this._usuario; }
  public set usuario(value) {
    if (this._usuario === value) return;
    this._usuario = value;
  }

  constructor(
    private readonly router: Router,
    private readonly dialog: MatDialog,
    private readonly vagaService: VagaService,
    private readonly usuarioService: UsuarioService,
  ) { }

  ngOnInit(): void {
    this.obterUsuario();
    this.obterLista();
  }

  openDialog() {
    this.dialog.open(CadastrarComponent, {
      data: {
        titulo: 'Cadastrar Vaga',
      },
      disableClose: true
    });
    this.dialog.afterAllClosed.subscribe(data => {
      this.obterLista();
    });
  }

  async obterLista() {
    this.listaVagas = await this.vagaService.obterLista();
  }

  async obterUsuario() {
    this.usuario = await this.usuarioService.obterPorId();
  }

  deslogar(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }


}
