import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpRequest, HttpResponse} from "@angular/common/http";
import {LoaderService} from "../services/loader.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class LoaderInterceptorService {
  constructor(private readonly loaderService: LoaderService) {
  }

  private req: number = 0;

  removeRequest() {
    const i = this.req
    if (i >= 0) {
      this.req -= 1;
    }
    this.loaderService.isLading.next(this.req > 0);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request) {
      this.req += 1;
    }
    this.loaderService.isLading.next(true);
    return new Observable(observer => {
      next.handle(request).subscribe(() => {
      });
      // noinspection JSDeprecatedSymbols
      const subscription = next.handle(request).subscribe(
        event => {
          if (event instanceof HttpResponse) {
            observer.next(event);
          }
        },
        err => {
          alert("Something is Going Wrong!");
          observer.error(err);
        },
        () => {
          observer.complete();
        }
      )
      return () => {
        this.removeRequest();
        subscription.unsubscribe();
      }
    })
  }
}
