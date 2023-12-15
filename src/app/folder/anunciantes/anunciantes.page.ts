import { Component, OnInit } from '@angular/core';
import { AnunciantesService } from 'src/app/services/anunciantes.service';

@Component({
  selector: 'app-anunciantes',
  templateUrl: './anunciantes.page.html',
  styleUrls: ['./anunciantes.page.scss'],
})
export class AnunciantesPage implements OnInit {

  constructor(
    private anunciantesServ: AnunciantesService
  ) { }
  anunciantes = [] as any
  ngOnInit() {
    this.anunciantes = this.anunciantesServ.getAnunciantes();
    console.log(this.anunciantes);
  }


  openBrowser(url: string){
    window.open(url, '_system');
  }

}
