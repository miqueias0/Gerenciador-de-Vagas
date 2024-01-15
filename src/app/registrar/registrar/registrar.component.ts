import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models';
import { UsuarioService } from 'src/app/services';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss']
})
export class RegistrarComponent implements OnInit {

  hide = true;
  @Input()
  buttonName: string = "";

  form = this.builder.group({
    id: [''],
    nomeUsuario: ['', [Validators.required]],
    email: ['', [Validators.email]],
    telefone: ['', []],
    senha: ['', [Validators.required]],
    tipoUsuario: ['', [Validators.required]],
  });

  tipoUsuarioLista: string[] = ['Candidato', 'Contratante'];

  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly builder: FormBuilder,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    this.form.controls['telefone'].valueChanges.subscribe(value => {
      if (value) {
        let soma = value.replace(/\D/g, '').length;
        var valor = value.replace(/\D/g, '');
        var telefoneMascarado = "";
        if (soma > 0) {
          telefoneMascarado = '(' + valor.substring(0, valor.length < 2 ? valor.length : 2);
        }
        if (soma > 2) {
          telefoneMascarado += ") " + valor.substring(2, soma < 6 ? valor.length : 7);
        }
        if (soma > 7) {
          telefoneMascarado += "-" + valor.substring(7, valor.length < 12 ? valor.length : 12);
        }
        this.form.controls['telefone'].setValue(telefoneMascarado, {emitEvent: false});
      }
    });
  }

  async registrar() {
    if (!this.form.valid) return alert("Invalid");
    await this.usuarioService.manter(new Usuario(this.form.getRawValue() as any));
    this.router.navigate(['/hub']);
  }

}
