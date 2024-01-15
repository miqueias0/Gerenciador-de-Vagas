import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { VagaService } from '../services';
import { Vaga } from '../models/vagaModelo';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.scss']
})
export class CadastrarComponent implements OnInit {

  form: FormGroup = this.fb.group({
    titulo: ['', [Validators.required]],
    descricao: ['', [Validators.required]],
    requisitos: [, []],
  });



  constructor(
    private readonly fb: FormBuilder,
    private readonly vagaService: VagaService,
    private readonly dialogRef: MatDialogRef<CadastrarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { titulo: string, objeto: Vaga }
  ) { }

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm() {
    this.form.reset({
      titulo: this.data.objeto ? this.data.objeto.titulo : '',
      descricao: this.data.objeto ? this.data.objeto.descricao : '',
    });
    if (this.data.objeto && this.data.objeto.requisitos) {
      this.data.objeto.requisitos.forEach((value: string) => {
        this.adicionarAoRequisitos(value);
      });
    }
  }

  async cadastrar() {
    let cont = 0;
    while(cont < 10000){
      setTimeout(() => {
        this.vagaService.manter(new Vaga({
          id: undefined,
          titulo: "Desenvolvedor",
          descricao: "asdasdasdasdasd",
          requisitos: [
              "Java"
          ]
      }));
      }, 0);
      cont++;
    }
    if (!this.form.valid) return alert("Preencha todos os campos obrigatórios!");
    let vaga: Vaga | null = null;
    if (!this.data.objeto) {
      vaga = await this.vagaService.manter(this.form.getRawValue());
    } else {
      Object.assign(this.data.objeto, this.form.getRawValue())
      vaga = await this.vagaService.alterar(this.data.objeto);
    }
    this.dialogRef.close(vaga)
  }


  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  requisitos: { name: string }[] = [];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.adicionarAoRequisitos(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  adicionarAoRequisitos(value: string) {
    this.requisitos.push({ name: value });
    this.form.controls['requisitos'].setValue(this.requisitos.map(x => x.name));
  }

  remove(rquisito: { name: string }): void {
    const index = this.requisitos.indexOf(rquisito);

    if (index >= 0) {
      this.requisitos.splice(index, 1);
      this.form.controls['requisitos'].setValue(this.requisitos.map(x => x.name));
    }
  }
}

