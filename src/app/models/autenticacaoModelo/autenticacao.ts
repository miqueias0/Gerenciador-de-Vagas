import { IAutenticacao } from "./i-autenticacao";

export class Autenticacao implements IAutenticacao{
    private _token: string = "";
    get token(){
        return this.token;
    }
    set token(value: any){
        if(this._token === value){return;}
        this._token = value;
    }
    private _identificador: string = "";
    get identificador(){
        return this.identificador;
    }
    set identificador(value: any){
        if(this._identificador === value){return;}
        this._identificador = value;
    }

    constructor(data?: IAutenticacao){
        if(data) this.fromRaw(data);
    }

    fromRaw(data: IAutenticacao){
        this.identificador = data.identificador;
        this.token = data.token;
    }

    toJSON(){
        return {
            token: this.token,
            identificador: this.identificador,
        }
    }

}