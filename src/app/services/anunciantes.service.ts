import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnunciantesService {
  anunciantes = [
    {
      kind: "advertise",
      texto_alt: "TV UNAM",
      url: "https://www.tvunam.unam.mx/",
      imagen: "../../../assets/images/TV_UNAM-FIL_MINERIA_2023_APP-LEEMELO.jpg"
    },
    {
      kind: "advertise",
      texto_alt: "RADIO UNAM",
      url: "https://www.radiounam.unam.mx/",
      imagen: "../../../assets/images/Los-libros-también-se-escuchan_Banner-para-APP.jpg"
    },
    {
      kind: "advertise",
      texto_alt: "SC CDMX",
      url: "https://www.cultura.cdmx.gob.mx/",
      imagen: "../../../assets/images/cartelera-cuadrado.png"
    }
  ]
  constructor() { }

  getAnunciantes(){
    return this.anunciantes
  }
  async getRandomAnunciante(){
    let random = Math.floor(Math.random() * this.anunciantes.length);
    let res = this.anunciantes[random];
    console.log('anuncio random', res);
    return res;
  }
}
