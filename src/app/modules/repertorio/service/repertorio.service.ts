import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, finalize } from 'rxjs';
import { AuthService } from '../../auth';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class RepertorioService {
  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;

  constructor(private http:HttpClient, public authService:AuthService) { 
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }
  
  listRepertorios(search:any, state:any){
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    let LINK = "?T=";
    if(search){
      LINK += "&search="+search;
    }
    if(state){
      LINK += "&state="+state;
    }
    let URL = URL_SERVICIOS+"/repertorio"+LINK;
    return this.http.get(URL,{headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  registerRepertorio(data:any){
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    let URL = URL_SERVICIOS+"/repertorio";
    return this.http.post(URL, data, {headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  showRepertorio(repertorio_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    let URL = URL_SERVICIOS+"/repertorio/"+repertorio_id;
    this.isLoadingSubject.next(true);
    return this.http.get(URL,{headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  updateRepertorio(data:any, repertorio_id:any){
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    let URL = URL_SERVICIOS+"/repertorio/"+repertorio_id;
    return this.http.post(URL, data, {headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  deleteRepertorio(repertorio_id:any){
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    let URL = URL_SERVICIOS+"/repertorio/"+repertorio_id;
    return this.http.delete(URL, {headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  listCanciones(repertorio_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    let URL = URL_SERVICIOS+"/repertorio-cancion?repertorio_id="+repertorio_id;
    this.isLoadingSubject.next(true);
    return this.http.get(URL,{headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }
  
  registerCancion(data:any){
    this.isLoadingSubject.next(true);
      let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
      let URL = URL_SERVICIOS+"/repertorio-cancion";
      return this.http.post(URL, data, {headers: headers}).pipe(
        finalize(() => this.isLoadingSubject.next(false))
      );
  }

  updateCancion(data:any, cancion_id:any){
    this.isLoadingSubject.next(true);
      let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
      let URL = URL_SERVICIOS+"/repertorio-cancion/"+cancion_id;
      return this.http.put(URL, data, {headers: headers}).pipe(
        finalize(() => this.isLoadingSubject.next(false))
      );
  }

  deleteCancion(cancion_id:any){
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    let URL = URL_SERVICIOS+"/repertorio-cancion/"+cancion_id;
    return this.http.delete(URL, {headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  listOpciones(cancion_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    let URL = URL_SERVICIOS+"/repertorio-opcion?cancion_id="+cancion_id;
    this.isLoadingSubject.next(true);
    return this.http.get(URL,{headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }
  
  registerOpcion(data:any){
    this.isLoadingSubject.next(true);
      let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
      let URL = URL_SERVICIOS+"/repertorio-opcion";
      return this.http.post(URL, data, {headers: headers}).pipe(
        finalize(() => this.isLoadingSubject.next(false))
      );
  }

  updateOpcion(data:any, cancion_id:string){
      this.isLoadingSubject.next(true);
      let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
      let URL = URL_SERVICIOS+"/repertorio-opcion/"+cancion_id;
      return this.http.put(URL, data, {headers: headers}).pipe(
        finalize(() => this.isLoadingSubject.next(false))
      );
    }

  deleteOpcion(cancion_id:any){
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    let URL = URL_SERVICIOS+"/repertorio-opcion/"+cancion_id;
    return this.http.delete(URL, {headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  registerOpcionFile(data:any){
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    let URL = URL_SERVICIOS+"/repertorio-opcion-file";
    return this.http.post(URL, data, {headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  deleteOpcionFile(opcion_file_id:any){
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    let URL = URL_SERVICIOS+"/repertorio-opcion-file/"+opcion_file_id;
    return this.http.delete(URL, {headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }
}
