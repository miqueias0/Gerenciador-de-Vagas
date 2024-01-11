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
    email: ['', []],
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
  }

  async registrar(){
    if (!this.form.valid) return alert("Invalid");
    await this.usuarioService.manter(new Usuario(this.form.getRawValue() as any));
    this.router.navigate(['/planilha']);
  }

}
