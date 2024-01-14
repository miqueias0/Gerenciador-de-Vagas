import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

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
  ) { }

  ngOnInit(): void {
  }

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  requisitos: { name: string }[] = [];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.requisitos.push({ name: value });
      this.form.controls['requisitos'].setValue(this.requisitos.map(x => x.name));
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(rquisito: { name: string }): void {
    const index = this.requisitos.indexOf(rquisito);

    if (index >= 0) {
      this.requisitos.splice(index, 1);
      this.form.controls['requisitos'].setValue(this.requisitos.map(x => x.name));
    }
  }
}

