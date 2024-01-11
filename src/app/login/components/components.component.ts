import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login, Usuario } from 'src/app/models';
import { UsuarioService } from 'src/app/services';


@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.scss']
})
export class ComponentsComponent implements OnInit {

  hide = true;
  registrarLayout = false;

  form = this.builder.group({
    email: ['', []],
    senha: ['', [Validators.required]],
    manterLogado: [false, [Validators.required]],
  });

  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly builder: FormBuilder,
    private readonly router: Router,
  ) { }

  async ngOnInit(): Promise<void> {
      if(!localStorage.getItem('token')) return;
      await this.usuarioService.loginComToken();
  }

  async login() {
    if (!this.form.valid) return;
    const usuario = new Usuario(this.form.getRawValue() as any);
    const login = new Login();
    login.usuario = usuario;
    login.manterLogado = this.form.get('manterLogado')?.value as boolean;
    await this.usuarioService.login(login);
  }

  registrar(){
    this.registrarLayout = !this.registrarLayout;
  }

}
