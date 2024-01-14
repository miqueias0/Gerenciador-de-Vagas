import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CadastrarComponent } from 'src/app/cadastrar/cadastrar.component';
import { Vaga } from 'src/app/models/vagaModelo';
import { VagaService } from 'src/app/services';

@Component({
  selector: 'app-hub',
  templateUrl: './hub.component.html',
  styleUrls: ['./hub.component.scss']
})
export class HubComponent implements OnInit {

  listaVagas: Vaga[] | null = [];

  constructor(
    private readonly router: Router,
    private readonly dialog: MatDialog,
    private readonly vagaService: VagaService
  ) { }

  ngOnInit(): void {
    this.obterLista();
  }

  openDialog() {
    this.dialog.open(CadastrarComponent, {
      data: {
        titulo: 'Cadastrar Vaga',
      },
    });
    this.dialog.afterAllClosed.subscribe(data => {
      this.obterLista();
    });
  }

  async obterLista() {
    this.listaVagas = await this.vagaService.obterLista();
  }
}
