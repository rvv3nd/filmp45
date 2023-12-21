import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule} from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeService } from './services/theme.service';
import { PdfViewerModule } from 'ng2-pdf-viewer';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, PdfViewerModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy}, ThemeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
