import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
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
        header.append('Content-Type', 'application/x-www-form-urlencoded');
        let pramas = JSON.stringify(dataObj)
        return new Promise((resolve, reject) => {
        this.http.post(URL, pramas, header)
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            }, err => {
                reject(err);
            })
        })
    }
}