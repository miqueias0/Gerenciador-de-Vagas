import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CadastrarComponent } from 'src/app/cadastrar/cadastrar.component';
import { Usuario } from 'src/app/models';
import { Candidatura, Vaga } from 'src/app/models/vagaModelo';
import { CandidaturaService, VagaService } from 'src/app/services';

@Component({
  selector: 'app-vagas',
  templateUrl: './vagas.component.html',
  styleUrls: ['./vagas.component.scss']
})
export class VagasComponent implements OnInit {

  @Input() lista: Vaga[] | null = [];
  @Input() usuario: Usuario | null = null;

  private _data: Vaga | null = null;

  get data(): Vaga | null { return this._data }
  set data(value: Vaga | null) {
    if (this._data === value) return;
    this._data = value;
  }

  constructor(
    private readonly dialog: MatDialog,
    private readonly vagaService: VagaService,
    private readonly candidaturaService: CandidaturaService,
  ) { }

  ngOnInit(): void {
  }

  selecionarVaga(vaga: Vaga | null) {
    if (vaga) {
      this.data = new Vaga(vaga);
      if (this.lista) {
        const value = this.lista.find(x => x.id === this.data?.id);
        if (value) {
          const index = this.lista.indexOf(value);
          Object.assign(this.lista[index], this.data);
        }
      } else {
        this.lista = [this.data];
      }
    }
  }

  openDialog() {
    this.dialog.open(CadastrarComponent, {
      data: {
        titulo: 'Alterar Vaga',
        objeto: this.data,
      },
      disableClose: true
    });
    this.dialog.afterAllClosed.subscribe(data => {
      if (this.data?.id) {
        this.obterVagaPorId(this.data.id);
      }
    });
  }

  async obterVagaPorId(id: string) {
    this.selecionarVaga(await this.vagaService.obterPorId(id));
  }

  async candidatar() {
    const candidatura: Candidatura = new Candidatura({ candidatoId: undefined, vagaId: this.data?.id });
    await this.candidaturaService.manter(candidatura);
    this.data = null;
  }

  async excluirVaga() {
    if (this.data) {
      await this.vagaService.excluir(this.data);
      this.data = null;
      this.lista = await this.vagaService.obterLista();
    }
  }

}
