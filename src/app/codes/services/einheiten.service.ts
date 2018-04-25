import {Injectable, Inject} from '@angular/core';
import {Http, Headers, URLSearchParams} from '@angular/http';
import {EKOR_URL} from '../../app.tokens';
import {Observable} from 'rxjs/Observable';
import {Einheit, HttpResonsetext} from '../../entities/codes';
import {OAuthService} from 'angular-oauth2-oidc';

@Injectable()
export class EinheitenService {

  public einheiten: Array<Einheit> = [];

  headers: Headers;
  // options: RequestOptions;

  constructor(private oauthService: OAuthService,
              private http: Http,
              @Inject(EKOR_URL) private ekorUrl: string) {

    /*this.headers = new Headers({ 'Content-Type': 'application/json',
                                 'Accept': 'q=0.8;application/json;q=0.9' });
    this.options = new RequestOptions({ headers: this.headers });*/

  }

  delEinheit(key: string, val: string): Observable<HttpResonsetext> {

    const url = this.ekorUrl + '/zeinheiten/delete';

    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');

    return this
      .http
      .delete(url + '/?' + key + '=' + val, {headers})
      .map(resp => resp.json());
  }

  findByCode(code: string): Observable<Einheit> {

    const url = this.ekorUrl + '/zeinheiten/get';

    const headers = new Headers();
    headers.set('Accept', 'text/json');
    // headers.set('Authorization', 'Bearer ' + this.oauthService.getAccessToken());

    const search = new URLSearchParams();
    search.set('code', code);
    search.set('mode', 'single');  // nur eine Einheit suchen

    return this
      .http
      .get(url, {headers, search})
      .map(resp => resp.json());
  }

  findMulti(code: string): Observable<Array<Einheit>> {

    const url = this.ekorUrl + '/zeinheiten/get';

    const headers = new Headers();
    headers.set('Accept', 'text/json');
    // headers.set('Authorization', 'Bearer ' + this.oauthService.getAccessToken());

    const search = new URLSearchParams();
    search.set('code', code);
    search.set('mode', 'all');   // alle Einheiten mit like code suchen

    return this
      .http
      .get(url, {headers, search})
      .map(resp => resp.json());
  }

  save(modData: Array<Einheit>): Observable<Einheit> {

    const url = this.ekorUrl + '/zeinheiten/post';

    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');

    return this
      .http
      .post(url, modData, {headers})
      .map(resp => resp.json());
  }



  insert(modData: Einheit): Observable<Einheit> {

    const url = this.ekorUrl + '/zeinheiten/put';

    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');

    return this
      .http
      .put(url, modData, {headers})
      .map(resp => resp.json());
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  /*save(einheit: Einheit): Observable<Einheit> {

    const url = this.ekorUrl + '/zeinheiten/getcodes';

    const headers = new Headers();
    //headers.set('Content-Type', 'application/x-www-form-urlencoded');
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');

    return this
      .http
      .post(url, einheit, { headers })
      .map(resp => resp.json());
  }*/

  /*save(einheit: Einheit): Observable<Einheit> {

    const url = this.ekorUrl + '/zeinheiten/savecode';

    return this.http.post<Einheit>(url, einheit);
  }
*/

  /*find(code: string): void {

    const url = this.ekorUrl + '/zeinheiten/getcode';
    const headers = new Headers();
    headers.set('Accept', 'text/json');
    // headers.set('Authorization', 'Bearer ' + this.oauthService.getAccessToken());

    // this.oauthService.hasValidAccessToken();
    // this.oauthService.hasValidIdToken();

    const search = new URLSearchParams();
    search.set('code', code);

    this
      .http
      .get(url, {headers, search})
      .map(resp => resp.json())
      .subscribe(
        (einheiten) => {
          this.einheiten = einheiten;
        },
        (err) => {
          console.warn(err);
        }
      );
  }*/
}
