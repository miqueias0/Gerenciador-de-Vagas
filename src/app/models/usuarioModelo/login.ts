import { ILogin } from "./i-login";
import { IUsuario } from "./i-usuario";
import { Usuario } from "./usuario";

export class Login implements ILogin {

    private _usuario: IUsuario | undefined;
    get usuario() { return this._usuario; }
    set usuario(value) {
        if (this._usuario === value) return;
        this._usuario = value;
    }

    private _manterLogado: boolean = false;
    get manterLogado() { return this._manterLogado; }
    set manterLogado(value) {
        if (this._manterLogado === value) return;
        this._manterLogado = value;
    }

    constructor(data?: ILogin) {
        if (data) this.fromRaw(data);
    }

    fromRaw(data: ILogin) {
        this.usuario = new Usuario(data.usuario);
        this.manterLogado = data.manterLogado;
    }

    toJSON() {
        return {
            usuario: this.usuario,
            manterLogado: this.manterLogado,
        };
    }

}