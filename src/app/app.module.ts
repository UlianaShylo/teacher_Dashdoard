import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { PlotlyService } from './plotly-component/plotly-component.component';
// import { D3Service } from './plotly.service';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { PlotlyService } from './plotly.service';
import { PlotlyComponent } from './plotly-component/plotly-component.component';
import { MultiSelectComponent } from './multi-select/multi-select.component';
import { DataService } from './data-service.service';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';


@NgModule({
  declarations: [
    AppComponent,
    PlotlyComponent,
    MultiSelectComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    // PlotlyComponent,
  ],
  providers: [PlotlyService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
