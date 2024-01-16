import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable, catchError, from, throwError } from "rxjs";
@Injectable()
export class AuthService implements HttpInterceptor {

    constructor(
        private readonly snackBar: MatSnackBar,
    ) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> | any {
        const token = localStorage.getItem('token');
        if (token) {
            req = req.clone({
                headers: req.headers.set('Authorization', token),
            })
        }
        return from(next.handle(req).pipe(
            catchError((error: HttpErrorResponse, caught: Observable<HttpEvent<any>>) => {
                let mensagem = "";
                if (error.error) {
                    if (typeof error.error === 'string') {
                        mensagem = error.error;
                    } else if (error.error.message) {
                        mensagem = error.error.message;
                    } 
                    // else {
                    //     if(error.error.stack){
                    //         mensagem = error.error.stack.substring(error.error.stack.indexOf(' '), error.error.stack.indexOf("\r\n")).trim();
                    //     }else{
                    //         mensagem = `${error}`;
                    //     }
                    // }
                }
                if (mensagem) {
                    this.snackBar.open(mensagem, undefined, {
                        duration: 3000
                    });
                }

                if ((error.url ? error.url : error.message ? error.message : '').indexOf('/usuario/') >= 0) {
                    localStorage.removeItem('token');
                    if(!mensagem){
                        this.snackBar.open(((error.url ? error.url : error.message ? error.message : '').indexOf('/login') >= 0) ? "Usuario não Encontrado": "Erro", undefined, {
                            duration: 3000
                        });
                    }
                }

                return throwError(error);
            })
        ).toPromise());
    }
}