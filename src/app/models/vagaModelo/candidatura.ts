import { ICandidatura } from "./i-candidatura";

export class Candidatura implements ICandidatura {
    private _candidatoId: string | undefined;
    get candidatoId() { return this._candidatoId; }
    set candidatoId(value) {
        if (this._candidatoId === value) return;
        this._candidatoId = value;
    }
    private _vagaId: string | undefined;
    get vagaId() { return this._vagaId; }
    set vagaId(value) {
        if (this._vagaId === value) return;
        this._vagaId = value;
    }

    constructor(data?: ICandidatura) {
        if (data) this.fromRaw(data);
    }

    fromRaw(data: ICandidatura) {
        this.candidatoId = data.candidatoId;
        this.vagaId = data.vagaId;
    }

    toJSON() {
        return {
            candidatoId: this.candidatoId,
            vagaId: this.vagaId,
        }
    }
}