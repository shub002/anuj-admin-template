import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from '../../shared/shared-service/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  private requestsInProgress = 0;

  constructor(private loaderService: LoaderService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.requestsInProgress === 0) {
      this.loaderService.show();
    }

    this.requestsInProgress++;

    return next.handle(req).pipe(
      finalize(() => {
        this.requestsInProgress--;
        if (this.requestsInProgress === 0) {
          this.loaderService.hide();
        }
      })
    );
  }
}
