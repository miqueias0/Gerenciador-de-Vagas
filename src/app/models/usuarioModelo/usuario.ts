import { IUsuario } from "./i-usuario";
import * as crypto from "crypto-js";

export class Usuario implements IUsuario {
    private _nomeUsuario: string | undefined;
    get nomeUsuario() { return this._nomeUsuario; }
    set nomeUsuario(value) {
        if (this._nomeUsuario === value) return;
        this._nomeUsuario = value;
    }
    private _email: string | undefined;
    get email() { return this._email; }
    set email(value) {
        if (this._email === value) return;
        this._email = value;
    }
    private _telefone: string | undefined;
    get telefone() { return this._telefone; }
    set telefone(value) {
        if (this._telefone === value) return;
        this._telefone = value;
    }
    private _senha: string | undefined;
    get senha() { return this._senha; }
    set senha(value) {
        if (this._senha === value) return;
        let cont = crypto.SHA256(value as string);
        this._senha = cont.toString();
    }
    private _tipoUsuario: string | undefined;
    get tipoUsuario() { return this._tipoUsuario; }
    set tipoUsuario(value) {
        if (this._tipoUsuario === value) return;
        this._tipoUsuario = value;
    }

    constructor(data?: IUsuario) {
        if (data) this.fromRaw(data);
    }

    fromRaw(data: IUsuario) {
        this.nomeUsuario = data.nomeUsuario;
        this.email = data.email;
        this.telefone = data.telefone;
        this.senha = data.senha;
        this.tipoUsuario = data.tipoUsuario;
    }

    toJSON() {
        return {
            nomeUsuario: this.nomeUsuario,
            email: this.email,
            telefone: this.telefone,
            senha: this.senha,
            tipoUsuario: this.tipoUsuario,
        }
    }


}