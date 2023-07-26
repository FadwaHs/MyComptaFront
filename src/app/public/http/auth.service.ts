import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { ConstantUrl } from 'src/app/shared/config/constant-url';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //info authentification
  isAuthenticated : boolean = false;
  roles: any;
  email : any;
  accessToken!: any;
  refreshToken!: any;



  constructor(private http : HttpClient , private router : Router) { }

  public login( email : string, password: string)
  {
    let options = {
      headers : new HttpHeaders().set("Content-Type","application/x-www-form-urlencoded")
    }

    let params = new HttpParams().set("email",email).set("password",password);
    return this.http.post("http://localhost:8082/api/Auth/login", params, options)
  }




  loadProfile(data: any) {

      this.isAuthenticated  = true;
      this.accessToken = data['access-token'];

      let decodedjwt : any  = jwtDecode(this.accessToken);
      this.email  = decodedjwt.sub;
      this.roles =  decodedjwt.scope;

      // store JWT and refresh token in local storage
      window.localStorage.setItem("jwt-token",this.accessToken);

      if(data['refresh-token'])
      {
        this.refreshToken = data['refresh-token'];
        window.localStorage.setItem("refresh-token",this.refreshToken );
      }


  }

  // appel this function in app compenent to reload tokens after refresh page
  loadJwtTokenFromLocalStorage() {

   let token = window.localStorage.getItem("jwt-token");
   let tokenrefresh = window.localStorage.getItem("refresh-token");

   if(token && tokenrefresh)
   {
        this.loadProfile({"access-token": token, "refresh-token": tokenrefresh});
   }

  }


  public refreshAccessToken(): Observable<any> {

    let refreshToken = window.localStorage.getItem('refresh-token');
    if (!refreshToken) {

      this.logout();
      return throwError('Refresh token not found');
    }

    //send req to refresh the acces token
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    let params = new HttpParams().set('refreshToken', refreshToken);

    return this.http.post('http://localhost:8082/api/Auth/refreshToken', params, options)
      .pipe(

        tap((data: any) => {

          console.log('Refresh Token Response:', data);
          this.loadProfile(data); // Load the new profile after successful refresh
        }),
        catchError((error: any) => {

          console.log(error.message);
          this.logout();
          return throwError(error.message);

        })
      );
  }


  logout() {

    this.isAuthenticated  = false;
    this.accessToken = undefined;
    this.email  = undefined;
    this.roles  = undefined;

    // should delete tokens from local storage
    window.localStorage.removeItem("jwt-token");
    window.localStorage.removeItem("refresh-token");

    this.router.navigateByUrl("/auth/login");
  }


}
