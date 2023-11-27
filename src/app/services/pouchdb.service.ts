import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { username, password } from '../configs/config-app';
import PouchDB from 'pouchdb';

@Injectable({
  providedIn: 'root'
})
export class PouchdbService {
  private localDB!: any;
  private remoteDB!: any;
  private username = username;
  private password = password;
  constructor() {
    this.initializeDB();  
  }

  initializeDB() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(username + ':' + password),
      'Accept': 'application/json',
      'withCredentials': 'true', // Esto indica que debes incluir credenciales (CORS)
    });
    this.localDB = new PouchDB('filmineria');
    const encodedCredentials = btoa(`${this.username}:${this.password}`);
    this.remoteDB = new PouchDB(`http://132.248.63.210:5984/filmineria/`);
    console.log('PouchDBService constructor started with localDB: ', this.localDB, ' and remoteDB: ', this.remoteDB);
    this.replicateFromRemote();
  }


  replicateFromRemote() {

    /**
     * Esta funcion replica los datos de la base de datos remota a la local
     * Y maneja los eventos de cambio, pausa, denegacion, error y completado
     */

    return this.localDB.replicate.from(this.remoteDB,{
      live: true,
      retry: true
    })
    .on('change', (change: any) => {
      console.log('Replicacion onchange', change);
    })
    .on('paused', (info: any) => {
      console.log('Replicacion onpaused', info);
    })
    .on('denied', (err: any) => {
      console.log('Replicacion ondenied', err);
    })
    .on('error', (err: any) => {
      console.log('Replicacion onerror', err);
    })
    .on('complete', (info: any) => {
      console.log('Replicacion oncomplete', info);
    })
  }

  getLocalDB() {
    return this.localDB;
  }


  getRemoteDB() {
    return this.remoteDB;
  }

}
