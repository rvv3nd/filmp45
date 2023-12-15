import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PouchdbService } from 'src/app/services/pouchdb.service';

@Component({
  selector: 'app-days',
  templateUrl: './days.component.html',
  styleUrls: ['./days.component.scss']
})
export class DaysComponent implements OnInit {
  days: string[] = [];
  @Input() selectedDay = 'Obteniendo dias...';
  @Output() selectedDayChange = new EventEmitter<string>();
  local : any;
  constructor(
    private pouchService: PouchdbService,
  ) {}

  ngOnInit() {
    this.local = this.pouchService.getLocalDB();
    // this.getDays();
  }

  onSelectedDayChange(day: string) {
    this.selectedDay = day;
    this.selectedDayChange.emit(this.selectedDay);
  }

  // getDays() {
  //   this.local.allDocs({
  //     include_docs: true,
  //     attachments: true
  //   }).then((result: any) => {
  //     console.log('allDocs', result)
  //     this.days = result.rows.map((row: any) => {
  //       try {
  //         return row.doc.startDate.substring(0, 10);
  //       } catch (error) {
  //         console.log('error pero no pasa nada', error);
  //       }
  //     });
  //     this.days = this.days.filter((day: string | undefined) => {
  //       return day !== undefined;
  //     });
  //     this.days = [...new Set(this.days)];
  //     this.days.sort((a: string, b: string) => {
  //       return new Date(a).getTime() - new Date(b).getTime();
  //     });
  //     //transformar a formato dia - mes
  //     this.days = this.days.map((day: string) => {
  //       return this.getDayFromDate(day);
  //     }) as never[];
  //     //console.log('days', this.days);
  //     this.selectedDay = this.days[0];
  //     this.selectedDayChange.emit(this.selectedDay);
  //   }).catch((error: any) => {
  //     console.log('error', error)
  //   });
  // }

  // getDaysBySalon(salon: string) {
  //   console.log('getDaysBySalon', salon);
  //   this.local.allDocs({
  //     include_docs: true,
  //     attachments: true
  //   }).then((result: any) => {
  //     console.log('allDocs', result)
  //     this.days = result.rows.map((row: any) => {
  //       try {
  //         if (row.doc.room.name === salon) {
  //           return row.doc.startDate.substring(0, 10);
  //         }
  //       } catch (error) {
  //         console.log('error pero no pasa nada', error);
  //       }
  //     });
  //     this.days = this.days.filter((day: string | undefined) => {
  //       return day !== undefined;
  //     });
  //     this.days = [...new Set(this.days)];
  //     this.days.sort((a: string, b: string) => {
  //       return new Date(a).getTime() - new Date(b).getTime();
  //     });
  //     //transformar a formato dia - mes
  //     this.days = this.days.map((day: string) => {
  //       return this.getDayFromDate(day);
  //     }) as never[];
  //     console.log('daysBySalon', this.days);
  //     this.selectedDay = this.days[0];
  //     this.selectedDayChange.emit(this.selectedDay);
  //   }).catch((error: any) => {
  //     console.log('error', error)
  //   });
  // }

  // getDaysByCategoria(category: string) {
  //   console.log('getDaysByCategoria', category);
  //   this.local.allDocs({
  //     include_docs: true,
  //     attachments: true
  //   }).then((result: any) => {
  //     console.log('allDocs', result)
  //     this.days = result.rows.map((row: any) => {
  //       try {
  //         if (row.doc.indexes[0].name === category) {
  //           return row.doc.startDate.substring(0, 10);
  //         }
  //       } catch (error) {
  //         console.log('error pero no pasa nada', error);
  //       }
  //     });
  //     this.days = this.days.filter((day: string | undefined) => {
  //       return day !== undefined;
  //     });
  //     this.days = [...new Set(this.days)];
  //     this.days.sort((a: string, b: string) => {
  //       return new Date(a).getTime() - new Date(b).getTime();
  //     });
  //     //transformar a formato dia - mes
  //     this.days = this.days.map((day: string) => {
  //       return this.getDayFromDate(day);
  //     }) as never[];
  //     console.log('daysByCat', this.days);
  //     this.selectedDay = this.days[0];
  //     this.selectedDayChange.emit(this.selectedDay);
  //   }).catch((error: any) => {
  //     console.log('error', error)
  //   });
  // }

  // private getDayFromDate(date: string) {
  //   let newDate = new Date(date);
  //   let options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric' };
  //   return newDate.toLocaleDateString('es-MX', options);
  // }

  // getDaysConActividadesAgendadas() {
  //   this.pouchService.getAgendaDB().allDocs({
  //     include_docs: true,
  //     attachments: true
  //   }).then((result: any) => {
  //     console.log('allDocs act agendadas', result)
  //     this.days = result.rows.map((row: any) => {
  //       try {
  //         return row.doc.startDate.substring(0, 10);
  //       } catch (error) {
  //         console.log('error pero no pasa nada', error);
  //       }
  //     });
  //     this.days = this.days.filter((day: string | undefined) => {
  //       return day !== undefined;
  //     });
  //     this.days = [...new Set(this.days)];
  //     this.days.sort((a: string, b: string) => {
  //       return new Date(a).getTime() - new Date(b).getTime();
  //     });
  //     //transformar a formato dia - mes
  //     this.days = this.days.map((day: string) => {
  //       return this.getDayFromDate(day);
  //     }) as never[];
  //     console.log('days', this.days);
  //     this.selectedDay = this.days[0];
  //     this.selectedDayChange.emit(this.selectedDay);
  //   }).catch((error: any) => {
  //     console.log('error', error)
  //   });
  // }

  formatearFecha(fecha: string): string {
    // Mapeo de nombres de meses
    const meses: { [key: string]: string } = {
      '01': 'ENE',
      '02': 'FEB',
      '03': 'MAR',
      // Add the remaining months as needed
    };

    const [dia, numero] = fecha.split(' ');

    const numeroMes = numero.length === 1 ? `03` : '02';

    const nombreMes = meses[numeroMes] as string;

    const fechaFormateada = `${dia.toUpperCase().substring(0, 2)}, ${numero} ${nombreMes}.`;
  
    return fechaFormateada;
  }

}
