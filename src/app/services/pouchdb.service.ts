import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { username, password } from '../configs/config-app';
import PouchDB from 'pouchdb';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PouchdbService {
  private localDB!: any;
  private remoteDB!: any;
  private agendaDB!: any;
  private username = username;
  private password = password;
  constructor(
    private toastCtrl : ToastController,
  ) {
    this.initializeDB();
  }

  initializeDB() {
    try {
      // Inicia la base de datos para la replicacion de couchdb a pouchdb (local)
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(username + ':' + password),
        'Accept': 'application/json',
        'withCredentials': 'true', // Esto indica que debes incluir credenciales (CORS)
      });
      this.localDB = new PouchDB('filmineria');
      const encodedCredentials = btoa(`${this.username}:${this.password}`);
      //this.remoteDB = new PouchDB(`http://132.248.63.210:5984/filmineria/`); //remote
      this.remoteDB = new PouchDB('http://127.0.0.1:5984/fil-mineria45/') //local
      console.log('PouchDBService constructor started with localDB: ', this.localDB, ' and remoteDB: ', this.remoteDB);
      this.replicateFromRemote();

      //Inicia la base de datos de agenda en local
      this.agendaDB = new PouchDB('agenda');
    } catch (error) {
      console.log('Error initializing DB:', error);
    }
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
      this.presentToast('Estamos descargando los datos de la FILPM, esto podría tomar unos segundos en completarse. Por favor espere...')
    })
    .on('paused', async (info: any) => {
      console.log('Replicacion onpaused', info);
      (info.result.ok) ? this.presentToast('Datos obtenidos exitosamente.') : this.presentToast('Error al obtener los datos de la FILPM, por favor intente más tarde.');
      // console.log('Replicacion completa LAS ACTIVIDADES SON:', await this.localDB.query('filmineria/actividades_view'));
    })
    .on('denied', (err: any) => {
      console.log('Replicacion ondenied', err);
      this.presentToast(`Error al obtener los datos de la FILPM: ${err}, por favor intente más tarde.`);
    })
    .on('error', (err: any) => {
      console.log('Replicacion onerror', err);
      this.presentToast(`Error al obtener los datos de la FILPM: ${err}, por favor intente más tarde.`);
    })
    .on('complete',(info: any) => {
      console.log('Replicacion oncomplete', info);
    })
  }

  presentToast(msg : string){
    this.toastCtrl.dismiss();
    this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    }).then((toast) => {
      toast.present();
    });
  }

  async getAllPDFs() {
    const pdfs = await this.localDB.query('filmineria/pdfs');
    console.log('pdfs From service', pdfs);

    return Promise.all(
      pdfs.rows.map(async (row: any) => {
        const pdfInfo = row.key;
        console.log('pdfInfo', pdfInfo);
        const pdfAttachments = pdfInfo._attachments;
        const pdfObjects = [];

        for (const pdfAttachmentName in pdfAttachments) {
          if (pdfAttachments.hasOwnProperty(pdfAttachmentName)) {
            const pdfAttachment = pdfAttachments[pdfAttachmentName];
            const pdfUrl = await this.getPdfUrl(pdfAttachment, pdfInfo._id, pdfAttachmentName);

            pdfObjects.push({
              id: pdfInfo._id,
              pdfName: pdfAttachmentName,
              src: pdfUrl,
              // Puedes agregar más propiedades según sea necesario
            });
          }
        }

        return pdfObjects;
      })
    ).then((pdfArrays: any[]) => {
      const flattenedArray = pdfArrays.reduce((acc, curr) => acc.concat(curr), []);
      console.log('flattenedArray', flattenedArray);
      return flattenedArray.filter((pdf: { src: null }) => pdf.src !== null);
    }); // Filtra los objetos sin data
  }

  async getPdfUrl(pdfAttachment: any, pdfId: string, pdfName: string): Promise<string | null> {
    if (pdfAttachment.stub) {
      // Si es un stub, realiza una operación adicional para obtener los datos reales
      try {
        const blob = await this.localDB.getAttachment(pdfId, pdfName);
        console.log('blob', blob);
        const dataUrl = URL.createObjectURL(blob);
        return dataUrl;
      } catch (error) {
        console.error('Error al obtener datos reales del archivo adjunto:', error);
        return null;
      }
    } else {
      // Si no es un stub, utiliza el valor actual en el objeto
      return `data:${pdfAttachment.content_type};base64,${pdfAttachment.data}`;
    }
  }

  //* Metodos para la base de datos de editoriales

  async getAllEditoriales() {
    const editoriales = await this.localDB.query('filmineria/editoriales');
    console.log('editoriales From service', editoriales);
    return editoriales.rows.map((row: any) => {
      row.key.tematicas = this.limpiarTextoHTML(row.key.tematicas);
      if( row.key.paginas_web ) row.key.paginas_web = this.validarLink(row.key.paginas_web);
      if( row.key.responsables ) row.key.responsables = this.limpiarTextoHTML(row.key.responsables);
      if( row.key.editoriales_representadas ) row.key.editoriales_representadas = this.limpiarTextoHTML(row.key.editoriales_representadas);
      return row.key;
    });
  }

  async getStands(){
    const stands = await this.localDB.query('filmineria/stands');
    console.log('stands From service', stands);
    return stands
  }

  //* Metodos para la base de datos de actividades

  actividadesObtenidas = [];
  async getAllActividades() {
    const allActividades = await this.localDB.query('filmineria/actividades_view')
    //console.log('allActividades', allActividades.rows);

      let actividades = allActividades.rows.map((row: any) => {
        try {
          row.key.hora = new Date(row.key.startDate).getHours() + ':' + new Date(row.key.startDate).getMinutes() ;
          row.key.date = this.getDayFromDate(row.key.startDate);
          if(row.key.fecha_y_hora_final) {
            row.key.hora_final = new Date(row.key.fecha_y_hora_final).getHours() + ':' + new Date(row.key.fecha_y_hora_final).getMinutes();
            row.key.fecha_final = this.getDayFromDate(row.key.fecha_y_hora_final);
          }
          //obtiene row.id y lo busca en la base de datos de agenda, si existe entonces cambia row.key.agendada a true
          this.agendaDB.get(row.id).then((doc: any) => {
            row.key.agendada = true;
          }).catch((err: any) => {
            row.key.agendada = false;
          });
          row.key.activities[0].name = this.limpiarTextoHTML(row.key.activities[0].name);
          if (row.key.activities[0].moderators) {
            row.key.activities[0].moderators = this.limpiarTextoHTML(row.key.activities[0].moderators);
          }
          if (row.key.activities[0].authors) {
            row.key.activities[0].authors = this.limpiarTextoHTML(row.key.activities[0].authors);
          }
          if(row.key.organizer){
            row.key.organizer = this.limpiarTextoHTML(row.key.organizer);
          }
          return row.key;
        } catch (error) {
          console.log('error pero no pasa nada', error);
        }
        return row.key;
      });
      console.log('Actividades obtenidas y limpiadas:' );
      this.actividadesObtenidas = actividades;

    //console.log('Actividades limpias:', actividades);
    return this.actividadesObtenidas;
  }

  getDias(){
    return this.localDB.query('filmineria/days');
  }

  getLocalDB() {
    console.log('getting LocalDB', this.localDB);
    return this.localDB;
  }

  getRemoteDB() {
    return this.remoteDB;
  }

  // Metodos para la base de datos de agenda

  getAgendaDB() {
    return this.agendaDB;
  }

  getActividadesAgendadas() {
    return this.agendaDB.allDocs({include_docs: true});
  }

  async getActividadesDetalleAgendadas() {
    try {
      const actividades: any = await this.getActividadesAgendadas();
      console.log('Actividades:', actividades);
      const actividadesDetallePromesas = actividades.rows.map((actividad: any) => {
        return this.getActividadAgendada(actividad.doc._id, actividad.doc.recordatorios);
      });

      const actividadesDetalle = await Promise.all(actividadesDetallePromesas);

      console.log('Actividades detalle:', actividadesDetalle);
      for(let actividad of actividadesDetalle){
        actividad.hora = new Date(actividad.startDate).getHours() + ':' + new Date(actividad.startDate).getMinutes();
        if(actividad.fecha_y_hora_final) {
          actividad.hora_final = new Date(actividad.fecha_y_hora_final).getHours() + ':' + new Date(actividad.fecha_y_hora_final).getMinutes();
          actividad.fecha_final = this.getDayFromDate(actividad.fecha_y_hora_final);
        }        actividad.date = this.getDayFromDate(actividad.startDate);
        actividad.activities[0].name = this.limpiarTextoHTML(actividad.activities[0].name);
        if (actividad.activities[0].moderators) {
          actividad.activities[0].moderators = this.limpiarTextoHTML(actividad.activities[0].moderators);
        }
        if (actividad.activities[0].authors) {
          actividad.activities[0].authors = this.limpiarTextoHTML(actividad.activities[0].authors);
        }
        if(actividad.organizer){
          actividad.organizer = this.limpiarTextoHTML(actividad.organizer);
        }
      }
      return actividadesDetalle;
    } catch (error) {
      console.error('Error al obtener actividades detalladas:', error);
      throw error; // Puedes manejar el error según tus necesidades
    }
  }


  getActividadAgendada(id: string, recordatorios: any = []) {
    //console.log('getting actividad desde local con id', id);
    return this.localDB.get(id).then((doc: any) => {
      //console.log('Actividad encontrada:', doc);
      doc.recordatorios = recordatorios;
      return doc;
    }).catch((err: any) => {
      console.log('Error al obtener la actividad:', err);
    });
  }

  async addActividadAgendada(actividad: any) {
    try {
      let docAgendado = {
        _id : actividad._id,
        recordatorios : actividad.recordatorios,
      }
      const result = await this.agendaDB.put(docAgendado);
      console.log('Actividad agendada: ', result);
      // Mostrar el ID asignado al documento
      console.log('Documento añadido con ID:', result.id);
      console.log('BD actualizada', this.getActividadesAgendadas());
      return result;
    } catch (error) {
      console.error('Error al añadir el documento:', error);
      throw error;
    }
  }


  async updateActividadAgendada(actividad: any) {
    try {
      console.log('Actividad a actualizar:', actividad);
      const existingDoc = await this.agendaDB.get(actividad._id);
      actividad._rev = existingDoc._rev;
      console.log('Actividad a actualizar con rev:', actividad);
      const result = await this.agendaDB.put(actividad);

      // Mostrar el ID actualizado del documento
      console.log('Documento actualizado con ID:', result.id);

      return result;
    } catch (error) {
      console.error('Error al actualizar el documento:', error);
      throw error;
    }
  }

  async deleteActividadAgendada(actividadID: any) {
    try {
      this.agendaDB.get(actividadID).then((doc: any) => {
        this.agendaDB.remove(doc._id, doc._rev).then((result: any) => {
          console.log('result', result);
          // En base al id, borra la actividad del arreglo de actividades agendadas
          return result;
          // if(this.router.url == '/folder/programa-general') this.router.navigate(['/folder/programa-general']);
          // else this.router.navigate(['/folder/agenda']);
        }).catch((error: any) => {
          console.log('error', error);
        });
      })
    } catch (error) {
      console.error('Error al eliminar el documento:', error);
      throw error;
    }
  }

  //Funciones auxiliares

  public getDayFromDate(date: string) {
    let newDate = new Date(date);
    let options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric' };
    return newDate.toLocaleDateString('es-MX', options);
  }

  validarLink(enlace: string): string {
    // Verificar si el enlace ya tiene http:// o https://
    if (!/^https?:\/\//i.test(enlace)) {
      // Agregar http:// si no está presente
      return 'http://' + enlace;
    }
    // Si ya tiene http:// o https://, devolver el enlace sin cambios
    return enlace;
  }

  limpiarTextoHTML(textoHTML: string) {
    //usando expresiones Regulares limpia el texto de etiquetas HTML
    // Usando expresiones regulares limpia el texto de etiquetas HTML
    let textoSinEtiquetas = textoHTML.replace(/<[^>]*>?/gm, '');
    const entities: { [key: string]: string } = {
      'amp': '&',
      'lt': '<',
      'gt': '>',
      'quot': '"',
      'apos': "'",
      'nbsp': ' ',
      'iexcl': '¡',
      'iquest': '¿',
      'agrave': 'à',
      'aacute': 'á',
      'acirc': 'â',
      'atilde': 'ã',
      'auml': 'ä',
      'aring': 'å',
      'aelig': 'æ',
      'ccedil': 'ç',
      'egrave': 'è',
      'eacute': 'é',
      'ecirc': 'ê',
      'euml': 'ë',
      'igrave': 'ì',
      'iacute': 'í',
      'icirc': 'î',
      'iuml': 'ï',
      'eth': 'ð',
      'ntilde': 'ñ',
      'ograve': 'ò',
      'oacute': 'ó',
      'ocirc': 'ô',
      'otilde': 'õ',
      'ouml': 'ö',
      'divide': '÷',
      'oslash': 'ø',
      'ugrave': 'ù',
      'uacute': 'ú',
      'ucirc': 'û',
      'uuml': 'ü',
      'yacute': 'ý',
      'thorn': 'þ',
      'yuml': 'ÿ',
      'OElig': 'Œ',
      'oelig': 'œ',
      'Scaron': 'Š',
      'scaron': 'š',
      'Yuml': 'Ÿ',
      'fnof': 'ƒ',
      // Agregar letras acentuadas mayúsculas
  'Agrave': 'À',
  'Aacute': 'Á',
  'Acirc': 'Â',
  'Atilde': 'Ã',
  'Auml': 'Ä',
  'Aring': 'Å',
  'AElig': 'Æ',
  'Ccedil': 'Ç',
  'Egrave': 'È',
  'Eacute': 'É',
  'Ecirc': 'Ê',
  'Euml': 'Ë',
  'Igrave': 'Ì',
  'Iacute': 'Í',
  'Icirc': 'Î',
  'Iuml': 'Ï',
  'Ntilde': 'Ñ',
  'Ograve': 'Ò',
  'Oacute': 'Ó',
  'Ocirc': 'Ô',
  'Otilde': 'Õ',
  'Ouml': 'Ö',
  'Oslash': 'Ø',
  'Ugrave': 'Ù',
  'Uacute': 'Ú',
  'Ucirc': 'Û',
  'Uuml': 'Ü',
  'Yacute': 'Ý',
  'THORN': 'Þ',
    };
    // Usando expresiones regulares limpia el texto de todos los elementos como &eacute y los convierte a su caracter correspondiente
    let textoLimpio: string = textoSinEtiquetas.replace(/&([a-z\d]+|#[xX][a-f\d]+);/gi, (_match, _entity) => {
      // Replace the void return type with string
      return entities[_entity] || '';
    });

      return textoLimpio;
  };

}


