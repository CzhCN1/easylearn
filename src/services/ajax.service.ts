import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the HomeService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AjaxService {

    constructor(public http: Http) {
        console.log('Hello HomeService Provider');
    }

    get(URL) {
        return new Promise((resolve, reject) => {
            this.http.get(URL)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, err => {
                    reject(err);
                })
        })
    }

    post(URL,dataObj) {
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        let pramas = JSON.stringify(dataObj);
        // let pramas = "signature=czh&age=18";
        console.log(pramas);
        let options = new RequestOptions({headers:header});
        return new Promise((resolve, reject) => {
        this.http.post(URL, pramas, options)
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            }, err => {
                reject(err);
            })
        })
    }
}