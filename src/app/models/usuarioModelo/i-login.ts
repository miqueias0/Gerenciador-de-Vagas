import { IUsuario } from "./i-usuario";

export interface ILogin {
    usuario: IUsuario | undefined;
    manterLogado: boolean;
}