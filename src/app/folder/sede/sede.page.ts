
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-sede',
  templateUrl: './sede.page.html',
  styleUrls: ['./sede.page.scss'],
})
export class SedePage implements OnInit {
  @ViewChild('googleMapIframe')
  googleMapIframe!: ElementRef;
  
  constructor( private loadingService : LoadingService ) { }
  ngOnInit() {
    this.loadingService.presentLoading().then(() => {
      console.log('Se muestra loading');
      setTimeout(() => {
        this.loadingService.dismissLoading();
      }, 400);
    });
  }

  onIframeLoad(){
    


  }

}
