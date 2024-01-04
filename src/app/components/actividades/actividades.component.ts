import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { PouchdbService } from 'src/app/services/pouchdb.service';
import { ActionSheetController, IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { LoadingService } from 'src/app/services/loading.service';
import { DaysComponent } from '../days/days.component';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.scss'],
})
export class ActividadesComponent  implements OnInit {
  @ViewChild('modalAgendar', { read: IonModal }) modal!: IonModal;
  @ViewChild('modalEditar', { read: IonModal }) modalEditar!: IonModal;
  @ViewChild(DaysComponent) daysComponent!: DaysComponent;
  @Input() room = ''
  @Input() category = ''
  @Input() day = ''

  constructor(
    private pouchService : PouchdbService,
    public loadingService : LoadingService,
    private dataSh : DataSharingService,
    private actionSheetCtrl : ActionSheetController,
  ) { }

  filter = 'dia'; //controla en que filtro se encuentra el usuario
  loading = this.loadingService.isLoading; //variable que controla el loading
  isActionSheetOpen = false; //variable que controla el action sheet que muestra la confirmacion de eliminar de la agenda
  changes = false; //variable que controla si se han hecho cambios en los recordatorios de la agenda
  selectedDay = 'Obteniendo dias...'; //variable que guarda el dia seleccionado en el componente days
  private local : any; //variable que guarda la base de datos local
  found = true; //variable que controla si se muestra la pantalla de no encontrado
  valorBusqueda = ''; //variable que guarda el valor de la barra de busqueda
  agendadas : any[] = []; //variable que guarda las actividades agendadas
  recordatoriosOriginales : any = []; //variable que guarda los recordatorios originales de la actividad para comparar si se han hecho cambios
  agendada = false; //variable que controla si la actividad esta agendada o no
  actividades : any[] = [] //tiene todas las actividades sin filtrar
  actividadesFilter : any[] = []; //tiene las actividades filtradas por salon, categoria o dia o las agendadas
  actividadModal : any = {}; //es el objeto que usa el modal para mostrar la actividad en el proceso de agendar
  checkboxes = {
    horaExacta: false,
    quinceMinutosAntes: false,
    unaHoraAntes: false,
    unDiaAntes: false,
  }; //valores inicial de los checkboxes de los recordatorios para una nueva actividad agendada
  datePikcerIsAvailable = true; //variable que controla si se muestra el datepicker o no, no se muestra cuando se esta escribiendo en la barra de busqueda

  ngOnInit() {
    // console.log((this.room != '') ? `room ${this.room}`:'noroom' );
    // console.log((this.category != '') ? `category ${this.category}` : 'nocategory');
    // console.log((this.day != '') ? `day${this.day}`: 'noday');
    this.local = this.pouchService.getLocalDB();
    this.loadingService.isLoading.subscribe(loading => { //escucha el estado del loading
      // console.log('Loading changed on actividades.component.ts', loading);
    });
  }

  onSearchbarFocus() {
    this.hideDatepicker();
  }

  onSearchBlur() {
    if(this.valorBusqueda !== '') console.log('Texto de búsqueda:', this.valorBusqueda);
    else this.showDatepicker();
  }

  onInput(event: any) {
    // Lógica al escribir en la barra de búsqueda
    this.valorBusqueda = ''
    this.valorBusqueda = event.target.value;
    //console.log('Texto de búsqueda cambia:', this.valorBusqueda);
  }


  hideDatepicker() {
    this.datePikcerIsAvailable = false;
    //console.log('hideDatepicker');
  }
  showDatepicker() {
    this.datePikcerIsAvailable = true;
    //console.log('showDatepicker');
  }

  confirmCancelar(actividad : any) {
    //console.log('confirmCancelar', actividad);
    this.presentActionSheet(actividad);
  }

  guardarCambios(actividad: any){
    //guarda los cambios en los recordatorios
    //console.log('guardarCambios', actividad);
    this.pouchService.updateActividadAgendada(actividad).then((result: any) => {
      //console.log('result', result);
      this.changes = false;
      this.modalEditarDismiss();
    }).catch((error: any) => {
      console.log('error', error);
    })
  }

  checkChanges(){
    //checa los cambios en los recordatorios, si existen "changes" cambia a true y si no, cambia a false
    const { horaExacta, quinceMinutosAntes, unaHoraAntes, unDiaAntes } = this.actividadModal.recordatorios;
    const { horaExacta: horaExactaOrig, quinceMinutosAntes: quinceMinutosAntesOrig, unaHoraAntes: unaHoraAntesOrig, unDiaAntes: unDiaAntesOrig } = this.recordatoriosOriginales;

    if (horaExacta !== horaExactaOrig || quinceMinutosAntes !== quinceMinutosAntesOrig || unaHoraAntes !== unaHoraAntesOrig || unDiaAntes !== unDiaAntesOrig) {
      this.changes = true;
    } else {
      this.changes = false;
    }
  }

  onActividadEliminada(actividad: any) {
    // Lógica para actualizar el array de actividades al eliminar una
    this.actividades = this.actividades.filter((act) => act.id !== actividad.id);
  }

  toggleAgendar(actividadIndex: any) {
    //Lógica para mostrar un modal o un aviso de confirmacion segun el estado de agendada o no agendada de una actividad
    if(this.actividadesFilter[actividadIndex].agendada){
      this.presentActionSheet(this.actividadesFilter[actividadIndex]);
    }else{
      this.openModalAgendar(actividadIndex);
    }
  }

  openActividad(actividad : any){
    this.openModalEditar(actividad);
  }

  openModalAgendar(actividadIndex: any) {
    this.dataSh.setSharedData(this.actividadesFilter[actividadIndex]);
    //console.log('actividad', this.actividadesFilter[actividadIndex]);
    this.actividades[actividadIndex].agendada = !this.agendada;
    this.actividadModal = this.dataSh.getSharedData();
    this.actividadModal.agendada = false;
    this.modal.present();
  }

  openModalEditar(actividad : any) {
    this.actividadModal = actividad
    this.recordatoriosOriginales = {
      horaExacta: this.actividadModal.recordatorios.horaExacta,
      quinceMinutosAntes: this.actividadModal.recordatorios.quinceMinutosAntes,
      unaHoraAntes : this.actividadModal.recordatorios.unaHoraAntes,
      unDiaAntes: this.actividadModal.recordatorios.unDiaAntes,
    };
    //console.log('actividadesFilter', this.actividadesFilter);
    this.modalEditar.present();
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
    this.actividadModal.agendada = this.actividadModal.agendada;
  }

  cancelEdicion() {
    this.modalEditar.dismiss(null, 'cancel');
    this.actividadModal.recordatorios = this.recordatoriosOriginales;
    this.changes = false;
  }

  confirm() {
    this.modal.dismiss(null, 'confirm');
    //console.log('confirm', this.actividadModal);
    this.actividadModal.recordatorios = this.checkboxes
    this.pouchService.addActividadAgendada(this.actividadModal).then((result: any) => {
      this.actividadModal.agendada = true;
      this.resetCheckboxes();
      //console.log('result', result);
    }).catch((error: any) => {
      console.log('error', error);
    })
  }

  resetCheckboxes() {
    this.checkboxes = {
      horaExacta: false,
      quinceMinutosAntes: false,
      unaHoraAntes: false,
      unDiaAntes: false,
    };
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      console.log('Confirmado');
    }
  }

  get btnguardaractivado(): boolean {
    return !Object.values(this.checkboxes).some((value) => value);
  }

  async presentActionSheet(actividad : any) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: '¿Desea desagendar esta actividad? Se desactivará la notificación y se borrará de su agenda.',
      buttons: [
        {
          text: 'Sí, desagendar actividad',
          role: 'destructive',
          data: {
            action: 'delete',
          },
          handler: () => {
            console.log('Desagendando...');
            this.pouchService.deleteActividadAgendada(actividad._id).then((result: any) => {
              //console.log('result', result);
              if(this.filter === 'agenda'){
                //console.log('agenda', this.actividadesFilter);
                this.actividadesFilter = this.actividadesFilter.filter((act: any) => act._id !== actividad._id)
                //console.log('agenda nueva', this.actividadesFilter);
                this.modalEditarDismiss();
              };
              actividad.agendada = !actividad.agendada;
            }).catch((error: any) => {
              console.log('error', error);
            })
          },
        },
        {
          text: 'No, cancelar',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
          handler: () => {
            //console.log('Cancelando...');
          }
        },
      ],
    });

    await actionSheet.present();
  }

  modalEditarDismiss(){
    this.modalEditar.dismiss(null, 'confirm');
  }

  setOpen(isOpen: boolean = true) {
    this.isActionSheetOpen = isOpen;
  }

  async getAllActividadesAgendadas(){
    const allActividades = await this.pouchService.getActividadesAgendadas();
    this.dataSh.actividadesAgendadas = allActividades;
    //console.log('allActividades', allActividades);
    return allActividades;
  }

  async getActividadesAgendadas(cargarDias = false): Promise<boolean>{
    this.loadingService.setIsLoading(true);
    //console.log('getActividadesAgendadas');
    this.filter = 'agenda';
    //console.log("Actividades agendadas", this.filter);
    return this.pouchService.getActividadesDetalleAgendadas().then((actividades: any) => {
      if(cargarDias){
        this.daysComponent.days = this.getDaysFromActividades(actividades);
        //console.log('this.daysComponent.days se supone que ordnados', this.daysComponent.days);
        this.daysComponent.selectedDay = this.daysComponent.days[0];
      }
      let res = []
      for (let actividad of actividades) {
        if (actividad.date === this.daysComponent.selectedDay) {
          res.push(actividad)
        }
      }
      this.actividades = res;
      this.actividadesFilter = res;
      //console.log('actividades agendadas', this.actividadesFilter);
      this.loadingService.setIsLoading(false);
      if(this.actividadesFilter.length === 0) this.found = false;
      else this.found = true;
      //console.log('found', this.found);
      return this.found;
    }
    ).catch((error: any) => {
      console.log('error', error);
      return false;
    })
  }

  getActividadesPorSalon(room: string, getDias = false) {
    this.filter = 'room';
    this.loadingService.setIsLoading(true);
    //console.log("Salon seleccionado", this.room);
    //obteiene todas las actividades de un salon
    let res: any[] = []
    this.getAllActividades().then((allActividades: any) => {
      //Obtiene todas las actividades de un salon
      //console.log('allActividades', allActividades);
      for (let actividad of allActividades) {
        if(actividad.room){
          if (actividad.room.name === this.room) {
            res.push(actividad)
          }
        }
      }
      //console.log('res', res);
      //Si getDias es true, se obtienen los dias de las actividades del salon
      if(getDias) {
        this.daysComponent.days = this.getDaysFromActividades(res);
        this.daysComponent.selectedDay = this.daysComponent.days[0];
      }
      //Obtiene las actividades del dia seleccionado
      let res2 = []
      for (let actividad of res) {
        if (actividad.date === this.daysComponent.selectedDay) {
          res2.push(actividad)
        }
      }
      this.actividades = res;
      this.actividadesFilter = res2;
      //console.log('actividades por salon', this.actividades);
      this.ordenarActividadesPorHora(this.actividadesFilter);
      //console.log('actividades por salon y día', this.actividadesFilter);
      this.loadingService.setIsLoading(false);
    }).catch((error: any) => {
      console.log('error', error);
    })
  }

  getActividadesPorCategoria(category: string, getDias = false) {
    this.filter = 'categoria';
    this.loadingService.setIsLoading(true);
    if(getDias){
      this.daysComponent.days = this.getDaysFromActividades(this.actividades);
      this.daysComponent.selectedDay = this.daysComponent.days[0];
    }
    //console.log("Categoria seleccionada", this.category);
    //obteiene todas las actividades de una categoria
    let res: any[] = []
    this.getAllActividades().then((allActividades: any) => {
      //Obtiene todas las actividades de una categoria
      //console.log('allActividades', allActividades);
      for (let actividad of allActividades) {
        if(actividad.indexes[0]){
          if (actividad.indexes[0].name === this.category) {
            res.push(actividad)
          }
        }
      }
      //console.log('res', res);
      //Si getDias es true, se obtienen los dias de las actividades de la categoria
      if(getDias) {
        this.daysComponent.days = this.getDaysFromActividades(res);
        this.daysComponent.selectedDay = this.daysComponent.days[0];
      }
      //Obtiene las actividades del dia seleccionado
      let res2 = []
      for (let actividad of res) {
        if (actividad.date === this.daysComponent.selectedDay) {
          res2.push(actividad)
        }
      }
      this.actividades = res;
      this.actividadesFilter = res2;
      this.ordenarActividadesPorHora(this.actividadesFilter);
      // console.log('actividades por categoria', this.actividades);
      // console.log('actividades por categoria y día', this.actividadesFilter);
      this.loadingService.setIsLoading(false);
    }).catch((error: any) => {
      console.log('error', error);
    })

  }


  async getAllActividades(){
    const allActividades = await this.pouchService.getAllActividades();
    //console.log('allActividades', allActividades);
    return allActividades;
  }


  async getDias(){
    const allDias = await this.pouchService.getDias();
    //console.log('allDias', allDias.rows);
    let singleDays = new Set();
    for (let dia of allDias.rows) {
      singleDays.add(this.getDayFromDate(dia.key));
    }
    return Array.from( singleDays) as string[];
  }

  async getActividadesPorDia(cargarDias = false):Promise<boolean> {
    this.loadingService.setIsLoading(true);
    try{
      return this.getAllActividades().then( (allActividades: any) => {
        if(cargarDias) { //solo se cargan los dias al iniio de su vista, en este caso en programa general
          //console.log('allActividades Para obtener dias', allActividades);
          const dias : any = this.getDaysFromActividades(allActividades);
          this.daysComponent.days = dias
          this.daysComponent.selectedDay = dias[0]
        }
        this.actividades = allActividades;
        //si no carga los dias, solo se obtiene el dia seleccionado que va cambiando en el componente days
        let res = []
        for (let actividad of allActividades) {
          if (actividad.date === this.daysComponent.selectedDay) {
            res.push(actividad)
          }
        }
        this.actividadesFilter = res;
        (this.actividadesFilter.length === 0) ? this.found = false : this.found = true;
        //ordena las actividades por hora en su campo hora
        this.ordenarActividadesPorHora(this.actividadesFilter);
        //console.log('actividades por dia', this.actividades);
        this.loadingService.setIsLoading(false);
        console.log('actividades ya filtradas que se van a mostrar', this.actividadesFilter, this.found);
        return this.found;
      })
    }catch(error){
      console.log('error', error);
      return false;
    }
  }



// Función para ordenar las actividades por el campo de hora
ordenarActividadesPorHora(actividades: any[]): any[] {
  return actividades.sort((actividadA, actividadB) => {
    const horaA = actividadA.hora || ""; // Asegurarse de tener una cadena
    const horaB = actividadB.hora || ""; // Asegurarse de tener una cadena
    const comparacionHoras = this.compararHoras(horaA, horaB);
    if (comparacionHoras === 0) {
      const prioridadA = actividadA.room.priority || 0; // Asegurarse de tener un número
      const prioridadB = actividadB.room.priority || 0; // Asegurarse de tener un número

      // Utilizar la función de comparación de prioridades
      return this.compararPrioridades(prioridadA, prioridadB);
    }
    // Utilizar la función de comparación personalizada
    return comparacionHoras;
  });
}

  compararPrioridades(prioridadA: number, prioridadB: number): number {
  // Comparar las prioridades de mayor a menor
  return prioridadB - prioridadA;
}
    // Función para comparar las horas
compararHoras(horaA: string, horaB: string): number {
  const horaNumeroA = parseInt(horaA.split(":")[0], 10);
  const horaNumeroB = parseInt(horaB.split(":")[0], 10);

  // Comparar las horas numéricamente
  return horaNumeroA - horaNumeroB;
}

  getDaysFromActividades(actividades: any[]) {
    let singleDays = new Set();
    for (let actividad of actividades) {
      singleDays.add(this.getDayFromDate(actividad.startDate));
    }
    //console.log('singleDays', singleDays);
    let res = this.ordenarFechas(Array.from(singleDays) as string[]);
    //console.log('res', res);
    this.daysComponent.days = res;
    this.daysComponent.selectedDay = res[0];
    //console.log('this.daysComponent.days', this.daysComponent.days);
    return res;
  }


  onSelectedDayChangeFromChild(day: any, filter: any) {
    //esta funcion se ejecuta cada que se selecciona un dia en el componente days
    this.actividadesFilter = []; //
    //console.log('onSelectedDayChangeFromChild', day);
    this.daysComponent.selectedDay = day;
    try{
      if(filter === 'categoria') this.getActividadesPorCategoria(this.category);
      if(filter === 'dia')  this.getActividadesPorDia();
      if(filter === 'room') this.getActividadesPorSalon(this.room);
      if(filter === 'agenda') this.getActividadesAgendadas();
    }catch(error){
      console.log('error', error);
    }
  }

  async buscarActividad(event: any){

    //obtiene todas las actividades de todos los dias
    this.loadingService.setIsLoading(true);
    // console.log('buscarActividad');
    // console.log('event', event.detail.value.toLowerCase());
    this.valorBusqueda = event.detail.value.toLowerCase();
    if(this.valorBusqueda === ''){
      //console.log('valorBusqueda vacio', this.filter);
      this.actividadesFilter = this.actividades;
      //console.log('actividadesFilter', this.actividadesFilter);
      this.getDaysFromActividades(this.actividadesFilter)
      this.loadingService.setIsLoading(false);
      return;
    }
    else{
      console.log('valorBusqueda no vacio', this.filter);
      if(this.filter === 'agenda'){
        this.pouchService.getActividadesDetalleAgendadas().then((actividades: any) => {
          //console.log('actividades', actividades);
          let res = []
          for(let actividad of actividades){
            //console.log('actividad', actividad, this.valorBusqueda);
            if(actividad.activities[0].name.toLowerCase().includes(this.valorBusqueda)) { res.push(actividad); break; }
            for(let index of actividad.indexes){
              if(index.name.toLowerCase().includes(this.valorBusqueda))  { res.push(actividad); break; }
            }
            if(actividad.activities[0].authors)
              if(actividad.activities[0].authors.toLowerCase().includes(this.valorBusqueda))  { res.push(actividad); break; }
            if(actividad.activities[0].moderators)
              if(actividad.activities[0].moderators.toLowerCase().includes(this.valorBusqueda)) { res.push(actividad); break; }
            if(actividad.organizer)
              if(actividad.organizer.toLowerCase().includes(this.valorBusqueda))  { res.push(actividad); break; }
          }
          this.actividadesFilter = res;
          this.ordenarActividadesPorHora(this.actividadesFilter);
          //console.log('actividadesFilterAgendadas', this.actividadesFilter);
          this.loadingService.setIsLoading(false);
        }
        ).catch((error: any) => {
          console.log('error', error);
        })
      }else{
        this.getAllActividades().then((allActividades: any) => {
          //console.log('allActividades', allActividades);
          if(this.filter != 'dia'){
            if(this.filter === 'room'){
              //console.log("rom", this.room)
              this.actividadesFilter = allActividades.filter((actividad: any) => {
                if(actividad.room.name == this.room ) return actividad
              })
              this.busqueda(this.actividadesFilter)
            }else if(this.filter === 'categoria'){
              this.actividadesFilter = allActividades.filter((actividad: any) => {
                for(let index of actividad.indexes){
                  if(index.name == this.category) return actividad
                }
              })
              //console.log('actividadesFilter', this.actividadesFilter);
              this.busqueda(this.actividadesFilter)
            }
            this.loadingService.setIsLoading(false);
          }
          else{
            this.loadingService.setIsLoading(false);
            this.actividadesFilter = allActividades;
            this.busqueda(this.actividadesFilter)
          }
          this.loadingService.setIsLoading(false);
          //console.log('actividadesFilter', this.actividadesFilter);
        })

      }
    }


  }

  onSearchCancel(){
    //console.log('onSearchCancel');
    this.valorBusqueda = '';
    this.buscarActividad({detail: {value: ''}});
  }
  busqueda(allActividades: any[]){
    //console.log('busqueda', this.valorBusqueda);
    this.actividadesFilter = allActividades.filter((actividad: any) => {
      if(actividad.activities[0].name.toLowerCase().includes(this.valorBusqueda)) return actividad
      for(let index of actividad.indexes){
        if(index.name.toLowerCase().includes(this.valorBusqueda)) return actividad
      }
      if(actividad.activities[0].authors)
        if(actividad.activities[0].authors.toLowerCase().includes(this.valorBusqueda)) return actividad
      if(actividad.activities[0].moderators)
        if(actividad.activities[0].moderators.toLowerCase().includes(this.valorBusqueda)) return actividad
      if(actividad.organizer)
        if(actividad.organizer.toLowerCase().includes(this.valorBusqueda)) return actividad
      if(actividad.room.name.toLowerCase().includes(this.valorBusqueda)) return actividad
    });
    this.actividadesFilter = this.ordenarActividadesPorHora(this.actividadesFilter);
    //console.log('actividadesFilter Busqueda', this.actividadesFilter);
  }

  public getDayFromDate(date: string) {
    let newDate = new Date(date);
    let options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric' };
    return newDate.toLocaleDateString('es-MX', options);
  }

  obtenerDiaMesHora(fechaISO: string): string {
    const fecha = new Date(fechaISO);

    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      hour: 'numeric',
      minute: 'numeric',
    };

    const formatoFecha = new Intl.DateTimeFormat('es-ES', options);

    return formatoFecha.format(fecha) + ' horas';
  }

  ordenarFechas(arrayFechas: string[]): string[] {
    //console.log('Ordenando:', arrayFechas)
    return arrayFechas.sort((a, b) => {
      const diaA = parseInt(a.split(' ')[1], 10);
      const diaB = parseInt(b.split(' ')[1], 10);

      // Ordenar por días del 24 en adelante primero, luego por días del 1 al 23
      if (diaA >= 23 && diaB >= 23) {
        return diaA - diaB; // Ordenar por días del 24 en adelante
      } else if (diaA < 23 && diaB < 23) {
        return diaA - diaB; // Ordenar por días del 1 al 23
      } else {
        return diaA >= 23 ? -1 : 1; // Colocar las fechas del 23 en adelante primero
      }
    });
  }

  toggleHoraExacta(){
    this.checkboxes.horaExacta = !this.checkboxes.horaExacta
  }

  formatearHora(hora: string): string {
    const partes = hora.split(':');

    if (partes.length === 2) {
      const horas = partes[0];
      let minutos = partes[1];

      // Asegurarse de que los minutos tengan dos dígitos
      minutos = minutos.length === 1 ? '0' + minutos : minutos;

      // Devolver la hora formateada
      return `${horas}:${minutos}`;
    }

    // Devolver la cadena original si no se puede analizar
    return hora;
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
    };
    // Usando expresiones regulares limpia el texto de todos los elementos como &eacute y los convierte a su caracter correspondiente
    let textoLimpio: string = textoSinEtiquetas.replace(/&([a-z\d]+|#[xX][a-f\d]+);/gi, (_match, _entity) => {
      // Replace the void return type with string
      return entities[_entity] || '';
    });

      return textoLimpio;
  };

}
