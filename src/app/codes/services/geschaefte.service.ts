import {Geschaeft, HttpResonsetext} from '../../entities/codes';
import {Headers, Http, URLSearchParams} from '@angular/http';
import {OAuthService} from 'angular-oauth2-oidc';
import {Observable} from 'rxjs/Observable';
import {EKOR_URL} from '../../app.tokens';
import {Injectable, Inject} from '@angular/core';

@Injectable()
export class GeschaefteService {

  public geschaefte: Array<Geschaeft> = [];

  headers: Headers;
  // options: RequestOptions;

  constructor(private oauthService: OAuthService,
              private http: Http,
              @Inject(EKOR_URL) private ekorUrl: string) {

    /*this.headers = new Headers({ 'Content-Type': 'application/json',
                                 'Accept': 'q=0.8;application/json;q=0.9' });
    this.options = new RequestOptions({ headers: this.headers });*/

  }


  findByLfnr(lfnr: string): Observable<Geschaeft> {

    const url = this.ekorUrl + '/zgeschaefte/get';

    const headers = new Headers();
    headers.set('Accept', 'text/json');
    // headers.set('Authorization', 'Bearer ' + this.oauthService.getAccessToken());

    const search = new URLSearchParams();
    search.set('lfnr', lfnr);
    search.set('mode', 'single');  // nur ein Geschäft suchen

    return this
      .http
      .get(url, {headers, search})
      .map(resp => resp.json());
  }

  selectAll(): Observable<Array<Geschaeft>> {

    const url = this.ekorUrl + '/zgeschaefte/get';

    const headers = new Headers();
    headers.set('Accept', 'text/json');
    // headers.set('Authorization', 'Bearer ' + this.oauthService.getAccessToken());

    const search = new URLSearchParams();
    search.set('mode', 'all');   // alle Geschäfte vom Sonntag laden

    return this
      .http
      .get(url, {headers, search})
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


}
