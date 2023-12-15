import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-organizadores',
  templateUrl: './organizadores.page.html',
  styleUrls: ['./organizadores.page.scss'],
})
export class OrganizadoresPage implements OnInit {

  organizadores = [
    {
      'cargo': 'Presidente honorario',
      'nombre': 'Dr. Leonardo Lomelí Vanegas',
      'descripcion': 'Rector de la Universidad Nacional Autónoma de México'
    },
    {
      "cargo": "PRESIDENTE EJECUTIVO",
      "nombre": "Dr. José Antonio Hernández Espriú",
      "descripcion": "Director de la Facultad de Ingeniería UNAM"
    },
    {
      "cargo": "VICEPRESIDENTE",
      "nombre": "Ing. Hugo Setzer Letsche",
      "descripcion": "Presidente de la Cámara Nacional de la Industria Editorial Mexicana"
    },
    {
      "cargo": "MIEMBRO DEL COMITÉ",
      "nombre": "Lic. Alejandra Frausto Guerrero",
      "descripcion": "Secretaria de Cultura"
    },
    {
      "cargo": "MIEMBRO DEL COMITÉ",
      "nombre": "Lic. Claudia Stella Curiel de Icaza",
      "descripcion": "Secretaria de Cultura de la Ciudad de México"
    },
    {
      "cargo": "MIEMBRO DEL COMITÉ",
      "nombre": "Dra. Sandra Xantall Cuevas Nieves",
      "descripcion": "Alcaldesa de Cuauhtémoc"
    },
    {
      "cargo": "MIEMBRO DEL COMITÉ",
      "nombre": "Dra. Rosa Beltrán Álvarez",
      "descripcion": "Coordinadora de Difusión Cultural de la UNAM"
    },
    {
      "cargo": "MIEMBRO DEL COMITÉ",
      "nombre": "Dra. Guadalupe Valencia García",
      "descripcion": "Coordinadora de Humanidades de la UNAM"
    },
    {
      "cargo": "MIEMBRO DEL COMITÉ",
      "nombre": "Dr. William Henry Lee Alardín",
      "descripcion": "Coordinador de la Investigación Científica de la UNAM"
    },
    {
      "cargo": "MIEMBRO DEL COMITÉ",
      "nombre": "Mtra. Socorro Venegas",
      "descripcion": "Directora General de Publicaciones y Fomento Editorial de la UNAM"
    },
    {
      "cargo": "SECRETARIO",
      "nombre": "Lic. Fernando Macotela Vargas",
      "descripcion": "Director de la Feria"
    }
  ];

  organizadores2 = [
    {
      "cargo": "PRESIDENTE",
      "nombre": "Dr. José Antonio Hernández Espriú",
      "descripcion": "Director de la Facultad de Ingeniería de la UNAM"
    },
    {
      "cargo": "SECRETARIO",
      "nombre": "Lic. Fernando Macotela Vargas",
      "descripcion": "Director de la Feria"
    },
    {
      "cargo": "SECRETARIA ADJUNTA",
      "nombre": "Lic. Beatriz Adriana Domínguez Mateos",
      "descripcion": "Feria Internacional del Libro del Palacio de Minería"
    },
    {
      "cargo": "ADMINISTRACIÓN",
      "nombre": "L.A. Pablo Bernardo Cervantes Pérez",
      "descripcion": "Secretario Administrativo Facultad de Ingeniería de la UNAM"
    },
    {
      "cargo": "AUDITORÍA INTERNA",
      "nombre": "Ing. José Alfredo Montero Rojas",
      "descripcion": "Auditor Interno de la UNAM"
    },
    {
      "cargo": "ACTIVIDADES CULTURALES",
      "nombre": "Lic. Esmeralda Murillo Viveros",
      "descripcion": "Luis Antonio Lara Rosas Feria Internacional del Libro del Palacio de Minería"
    },
    {
      "cargo": "ATENCIÓN A EXPOSITORES",
      "nombre": "Lesly Aidee Terrones Becerril",
      "descripcion": "Feria Internacional del Libro del Palacio de Minería"
    },
    {
      "cargo": "OPERACIÓN TÉCNICA",
      "nombre": "Alejandro Pérez Zitle",
      "descripcion": "Feria Internacional del Libro del Palacio de Minería"
    },
    {
      "cargo": "PRENSA Y DIFUSIÓN",
      "nombre": "Rubén García Morales",
      "descripcion": "Feria Internacional del Libro del Palacio de Minería"
    },
    {
      "cargo": "CONTABILIDAD",
      "nombre": "Diego Leonardo Grande Díaz",
      "descripcion": "Feria Internacional del Libro del Palacio de Minería"
    },
    {
      "cargo": "APOYO ADMINISTRATIVO",
      "nombre": "Gustavo Carrillo Franco",
      "descripcion": "Feria Internacional del Libro del Palacio de Minería"
    }
  ];
  isModeLight: boolean = true;
  constructor(
    private theme: ThemeService
  ) { }
  organizadoresVisible = true;

  toggleOrganizadoresVisibility() {
    this.organizadoresVisible = !this.organizadoresVisible;
  }
  organizadoresVisible2 = true;

  toggleOrganizadoresVisibility2() {
    this.organizadoresVisible2 = !this.organizadoresVisible2;
  }


  ngOnInit() {
    this.isModeLight = this.theme.getMode();
  }

}
