import { Injectable } from '@angular/core';
import { Usuario } from '../../usuarios/model/usuario.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/app/environments/environment';

const BASE_URL_AUTH = environment.BASE_URL_KALUM_AUTH;
const BASE_URL_ROLES = environment.BASE_URL_ROLES;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _token: string;
  private _usuario: Usuario;

  constructor(private http: HttpClient) { }

  public get token(): any {
    if(this._token != null){
      return this._token;
    }else if(this._token == null && sessionStorage.getItem('token') != null){
      this._token = JSON.stringify(sessionStorage.getItem('token'));
      return this._token;
    }
    return null;
  }

  public get usuario(): Usuario {
    if(this._usuario != null){
      return this._usuario;
    } else if(this._usuario && sessionStorage.getItem('usuario') != null){
      this._usuario = JSON.parse(sessionStorage.getItem('usuario') as string) as Usuario;
      return this._usuario;
    }
    return new Usuario();
  }

  isAuthenticated(): boolean {
    if(this.token != null) {
      let payload = this.getPayload(this.token);
      if(payload != null && payload.unique_name && payload.unique_name.length > 0){
        return true;
      }
    }
    return false;
  }

  hasRole(role: string): boolean {
    if(this.usuario.roles.includes(role)){
      return true;
    }
    return false;
  }

  getPayload(token: string): any{
    if(token && token != null){
      return JSON.parse(atob(token.split('.')[1]))
    }
    return null;
  }

  saveToken(token: string): void{
    this._token = token;
    sessionStorage.setItem('token',token);
  }

  saveUsuario(payload: any): void {
    this._usuario = new Usuario();
    this._usuario.username = payload.username;
    this._usuario.email = payload.email;
    this._usuario.identificationId = payload.identificationId || payload.IdentificationId;;
    this._usuario.roles = [BASE_URL_ROLES],
    sessionStorage.setItem('usuario',JSON.stringify(this._usuario));
  }

  login(usuario: Usuario): Observable<any>{
    const httpHeaders = new HttpHeaders({'Content-Type':'application/json'});
    //return this.http.get(BASE_URL_AUTH, usuario, {Headers: httpHeaders});
    return this.http.get(BASE_URL_AUTH);
  }

  logout(){
    this._token = '';
    this._usuario == null;
    sessionStorage.clear();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');
  }
}
