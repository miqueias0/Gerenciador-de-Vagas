import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CadastrarComponent } from 'src/app/cadastrar/cadastrar.component';
import { Notificacao, Usuario } from 'src/app/models';
import { Vaga } from 'src/app/models/vagaModelo';
import { NotificacaService, UsuarioService, VagaService } from 'src/app/services';

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
    private readonly notificacaoService: NotificacaService
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
    this.notificar();
  }

  deslogar() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  async notificar() {
    if (Notification.permission === 'granted') {
      this.obterNoticacoes();
    } else {
      Notification.requestPermission().then(p => {
        if (p === 'granted') {
          this.obterNoticacoes();
        }
      });
    }
  }

  async obterNoticacoes() {
    let notificacao: Notificacao[] | null = null;
    if (this._usuario?.tipoUsuario === 'Candidato') {
      notificacao = await this.notificacaoService.obterListaPorCandidato();
    } else if (this._usuario?.tipoUsuario === 'Contratante') {
      notificacao = await this.notificacaoService.obterListaPorContratante();
    }
    if (notificacao) {
      notificacao.forEach(x => {
        new Notification('Notificação', {
          body: x.mensagem,
          icon: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        });
        this.notificacaoService.alterar(x);
      });
    }
  }

}
