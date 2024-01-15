import { IVaga } from "./i-vaga";

export class Vaga implements IVaga {
    private _id: string | undefined;
    public get id() { return this._id; }
    public set id(value) {
        if (this._id === value) return;
        this._id = value;
    }
    private _titulo: string | undefined;
    public get titulo() { return this._titulo; }
    public set titulo(value) {
        if (this._titulo === value) return;
        this._titulo = value;
    }
    private _descricao: string | undefined;
    public get descricao() { return this._descricao; }
    public set descricao(value) {
        if (this._descricao === value) return;
        this._descricao = value;
    }
    private _requisitos: string[] | undefined;
    public get requisitos() { return this._requisitos; }
    public set requisitos(value) {
        if (this._requisitos === value) return;
        this._requisitos = value;
    }

    public get requisitosString() {
        return this.requisitos && this.requisitos.length > 0 ? this.requisitos.reduce((a, b) => a + ", " + b): null;
    }

    constructor(data?: IVaga) {
        if (data) this.fromRaw(data);
    }

    fromRaw(data: IVaga) {
        this.id = data.id;
        this.titulo = data.titulo;
        this.descricao = data.descricao;
        this.requisitos = data.requisitos;
    }

    toJSON() {
        return {
            id: this.id,
            titulo: this.titulo,
            descricao: this.descricao,
            requisitos: this.requisitos,
        }
    }
}