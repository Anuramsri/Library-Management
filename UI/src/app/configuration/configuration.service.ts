import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions, RequestMethod } from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';

@Injectable()
export class ConfigurationService {
    localApiUrl = environment.localApiUrl;


    constructor(private http: Http) { }

    getBooks() {
        return this.http.get(this.localApiUrl + "GetBooks")
          .pipe(map((res: Response) => res.json()));
    }
    // addbooks(data) {

    //     return this.http.post(this.localApiUrl + "books", data)
    //         .map((res: Response) => res.json())
    //         .catch(this.handleError);
    // }


    // updatebooks(id, data) {

    //     return this.http.put(this.localApiUrl + "books/" + id, data)
    //         .map((res: Response) => res.json())
    //         .catch(this.handleError);
    // }
    
    
    // deletebooks(id) {
    //     let headers = new Headers({
    //         'Content-Type': 'application/json',
    //         'Accept': 'q=0.8;application/json;q=0.9'
    //     });
    //     let options = new RequestOptions({ headers: headers });
    //     return this.http
    //         .delete(this.localApiUrl + 'books/' + id, options)
    //         .map(res => res.json());
    // }

    private handleError(error: Response | any) {
        return Observable.throw(error.status);
    }


}