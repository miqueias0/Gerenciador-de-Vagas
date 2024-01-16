import { INotificacao } from "./i-notificacao";

export class Notificacao implements INotificacao {
    private _mensagem: string | undefined;
    public get mensagem() { return this._mensagem; }
    public set mensagem(value) {
        if (this._mensagem === value) return;
        this._mensagem = value;
    }
    private _id: string | undefined;
    public get id() { return this._id; }
    public set id(value) {
        if (this._id === value) return;
        this._id = value;
    }

    constructor(data?: INotificacao) {
        if (data) this.fromRaw(data);
    }

    fromRaw(data: INotificacao) {
        this.mensagem = data.mensagem;
        this.id = data.id;
    }

    toJSON() {
        return {
            mensagem: this.mensagem,
            id: this.id,
        }
    }
}