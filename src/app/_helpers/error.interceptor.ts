import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {AccountService} from "../_services/account.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private  accountService: AccountService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(catchError( err => {
        if (err.status === 401){
          this.accountService.logout();
        }

        const  error = err.error.message || err.statusText;
        return throwError(error);
      }))
  }
}
