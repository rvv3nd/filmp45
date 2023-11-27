import { Component, OnInit } from '@angular/core';
import { PouchdbService } from '../../services/pouchdb.service';
import { LoadingService } from 'src/app/services/loading.service';
@Component({
  selector: 'app-programa-general',
  templateUrl: './programa-general.page.html',
  styleUrls: ['./programa-general.page.scss'],
})
export class ProgramaGeneralPage implements OnInit {

  constructor(
    private pouchDBService: PouchdbService,
    private loadingService: LoadingService
  ) { }

  found = true;
  local: any;
  days = [] 
  actividades : any[] = []
  selectedDay = 'Obteniendo dias...';
  ngOnInit() {
    this.loadingService.presentLoading();
    this.local = this.pouchDBService.getLocalDB();
    this.getDays();
    // setTimeout(()=>{
    //   this.found = true
    // },1000)
  }

  getEventsByDay(day: string) {
    this.local.allDocs({
      include_docs: true,
      attachments: true
    }).then((result: any) => {
      console.log('allDocs', result)
      let events = result.rows.map((row: any) => {
        try {
          if (this.getDayFromDate(row.doc.startDate.substring(0, 10)) === day) {
            //console.log('row', row);
            row.doc.activities[0].name = this.limpiarTextoHTML(row.doc.activities[0].name);
            row.doc.activities[0].authors = this.limpiarTextoHTML(row.doc.activities[0].authors);
            row.doc.organizer = this.limpiarTextoHTML(row.doc.organizer);
            row.doc.types[0].name = this.limpiarTextoHTML(row.doc.types[0].name);
            row.doc.startDate = new Date(row.doc.startDate).getHours() + ':' + new Date(row.doc.startDate).getMinutes() + '0';
            return row.doc ;
          }
        } catch (error) {
          console.log('error pero no pasa nada', error);
        }
      });
      this.found = events.length > 0;
      events = events.filter((event: any) => {
        return event !== undefined;
      });
      //ordena el arreglo por hora
      events.sort((a: any, b: any) => {
        return a.startDate - b.startDate;
      });
      console.log('events', events);
      this.actividades = events;
      this.loadingService.dismissLoading();
    }).catch((error: any) => {
      console.log('error', error)
      this.loadingService.dismissLoading();
    })
  }

  getDays() {
    console.log('local', this.local)
    this.local.allDocs({
      include_docs: true,
      attachments: true
    }).then((result: any) => {
      console.log('allDocs', result)
      this.days = result.rows.map((row: any) => {
        try {
          return row.doc.startDate.substring(0, 10);
        } catch (error) {
          console.log('error pero no pasa nada', error);
        }
      });
      this.days = this.days.filter((day: string | undefined) => {
        return day !== undefined;
      });
      this.days = [...new Set(this.days)];
      this.days.sort((a: string, b: string) => {
        return new Date(a).getTime() - new Date(b).getTime();
      });
      //transformar a formato dia - mes
      this.days = this.days.map((day: string) => {
        return this.getDayFromDate(day);
      }) as never[];
      //console.log('days', this.days);
      this.selectedDay = this.days[0];
      this.getEventsByDay(this.selectedDay);
      this.loadingService.dismissLoading();
    }).catch((error: any) => {
      console.log('error', error)
      this.loadingService.dismissLoading();
    })
  }

  onSelectedDayChangeFromChild(day: string) {
    console.log('onSelectedDayChangeFromChild', day);
    this.selectedDay = day;
    this.loadingService.presentLoading();
    this.getEventsByDay(day);
  }

  scrollToTop() {
    console.log('scrollToTop');
  }
  private getDayFromDate(date: string) {
    let newDate = new Date(date);
    let options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric' };
    return newDate.toLocaleDateString('es-MX', options);
  }

  limpiarTextoHTML(textoHTML: string) {
    //usando expresiones Regulares limpia el texto de etiquetas HTML
    // Usando expresiones regulares limpia el texto de etiquetas HTML
    let textoSinEtiquetas = textoHTML.replace(/<[^>]*>?/gm, '');

    // Usando expresiones regulares limpia el texto de todos los elementos como &eacute y los convierte a su caracter correspondiente
    let textoLimpio: string = textoSinEtiquetas.replace(/&([a-z\d]+|#[xX][a-f\d]+);/gi, (_match, _entity) => {
      // Replace the void return type with string
      return entities[_entity] || '';
    });
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
      };
      return textoLimpio;
  };
  
}
