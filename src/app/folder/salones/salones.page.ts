import { Component, OnInit } from '@angular/core';
import { PouchdbService } from 'src/app/services/pouchdb.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-salones',
  templateUrl: './salones.page.html',
  styleUrls: ['./salones.page.scss'],
})
export class SalonesPage implements OnInit {

  found: boolean = true;
  salones: any[] = [];
  isModeLight: boolean = true;
  local : any;
  constructor(
    private pouchService : PouchdbService,
    private theme: ThemeService,
  ) { }

  ngOnInit() {
    this.local = this.pouchService.getLocalDB();
    this.isModeLight = this.theme.getMode();
    this.getSalones();
  }

  getSalones(){
    this.local.allDocs({
      include_docs: true,
      attachments: true
    }).then((result: any) => { 
      console.log('allDocs', result)
      let salones = result.rows.map((row: any) => {
        try {
          return row.doc.room.name;
        } catch (error) {
          console.log('error pero no pasa nada', error);
          return undefined;
        }
      });
      //console.log('salones', salones);
      //Elimina los elementos repetidos del arreglo
      salones = [...new Set(salones)]
      //Elimina los elementos undefined del arreglo
      salones = salones.filter((value: any) => { return value !== undefined; });
      //ordena el arreglo por nombre
      salones.sort((a: any, b: any) => {
        return a.name - b.name;
      });
      console.log('salones', salones);
      this.found = salones.length > 0;
      this.salones = salones;
    }).catch((error: any) => {
      //console.log('error', error);
    }); 

  }
  limpiarTextoHTML(textoHTML: string) {
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
    //usando expresiones Regulares limpia el texto de etiquetas HTML
    let textoSinEtiquetas = textoHTML.replace(/<[^>]*>?/gm, '');
    // Usando exp reg limpia el texto de los saltos de linea
    textoSinEtiquetas = textoSinEtiquetas.replace(/(\r\n|\n|\r)/gm, '');
    // Usando expresiones regulares limpia el texto de todos los elementos como &eacute y los convierte a su caracter correspondiente
    let textoLimpio: string = textoSinEtiquetas.replace(/&([a-z\d]+|#[xX][a-f\d]+);/gi, (_match, _entity) => {
      // Remplaza un return de type void con string
      return entities[_entity] || '';
    });
    return textoLimpio;
  }

  
}
