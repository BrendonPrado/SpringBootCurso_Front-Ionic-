import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse, HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {StorageService} from '../service/storage.service';
import {AlertController} from '@ionic/angular';
import {branch} from '@angular-devkit/schematics/src/tree/static';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService, public alertCtrl: AlertController) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                retry(1),
                catchError((error: HttpErrorResponse) => {
                    let errorMessage = '';
                    if (error.error instanceof ErrorEvent) {
                        // client-side error
                        errorMessage = `Error: ${error.error.message}`;
                    } else {
                        // server-side error
                        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
                    }
                    switch (error.status) {
                        case 401:
                            this.handle401(error);
                            break;
                        case 403:
                            this.handle403();
                            break;
                        default:
                            this.handleDefaultError(error);
                            break;

                    }
                    return throwError(errorMessage);
                })
            );
    }
    handle403() {
        this.storage.setLocalUser(null);
    }
   async handle401(error: HttpErrorResponse) {
       let alert = await this.alertCtrl.create({
            header: `Erro ${error.status}: falha de autenticação `,
            message: 'Email ou senha incorretos',
            buttons: [{
                text: 'ok'
            }]
        });
        return alert.present();

    }


   async handleDefaultError(error: HttpErrorResponse) {
        let alert = await this.alertCtrl.create({
            header: `Erro ${error.status}: ${error.error}`,
            message: error.message,
            buttons: [{
                text: 'ok'
            }]
        });
        return alert.present();

    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};
