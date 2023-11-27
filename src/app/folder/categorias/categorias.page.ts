import { Component, OnInit } from '@angular/core';
import { PouchdbService } from 'src/app/services/pouchdb.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  found: boolean = true;
  local: any;
  categorias: any[] = [];
  constructor(
    private pouchService : PouchdbService,
    private theme: ThemeService,
    ) { }
  isModeLight: boolean = true;

  ngOnInit() {
    this.local = this.pouchService.getLocalDB();
    this.isModeLight = this.theme.getMode();
    //Obtiene el campo categories de todos los documentos con una query a la base de datos local pouchdb
    this.getCategorias();
  }

  getCategorias(){
    this.local.allDocs({
      include_docs: true,
      attachments: true
    }).then((result: any) => { 
      console.log('allDocs', result)
      let categorias = result.rows.map((row: any) => {
        try {
          return this.limpiarTextoHTML(row.doc.indexes[0].name);
        } catch (error) {
          //console.log('error pero no pasa nada', error);
          return undefined;
        }
      });
      //console.log('categorias', categorias);
      //Elimina los elementos repetidos del arreglo
      categorias = [...new Set(categorias)]
      //Elimina los elementos undefined del arreglo
      categorias = categorias.filter((value: any) => { return value !== undefined; });
      //ordena el arreglo por nombre
      categorias.sort((a: any, b: any) => {
        return a.name - b.name;
      });
      //agrega el icono correspondiente a cada categoria usando el metodo mapCategoriasConIconos
      categorias = this.mapCategoriasConIconos(categorias);
      //
      console.log('categorias', categorias);
      this.found = categorias.length > 0;
      this.categorias = categorias;
    }).catch((error: any) => {
      //console.log('error', error);
    });
  }

  mapCategoriasConIconos(categorias: string[]): any[] {
    const mapeoIconos: { [nombreCategoria: string]: string } = {
      "PRESENTACIONES DE LIBROS Y REVISTAS": 'book',
      "ACTIVIDADES DEL ESTADO INVITADO: GUANAJUATO": 'flag',  
      "EFEMÉRIDES POR AUTOR": 'newspaper',
      "CONFERENCIAS, CHARLAS Y MESAS REDONDAS": 'chatbubbles',
      "LECTURAS EN VOZ ALTA Y RECITALES": 'reader',
      "TALLERES Y PRESENTACIONES DE LIBROS INFANTILES": 'library',
      "JORNADAS JUVENILES": 'school'
    };

    return categorias.map(categoria => ({
      nombre: categoria,
      icono: mapeoIconos[categoria] || 'arrow-forward-outline'
    }));
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
  };
  

}


