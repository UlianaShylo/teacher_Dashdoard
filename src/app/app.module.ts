import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { PlotlyService } from './plotly-component/plotly-component.component';
// import { D3Service } from './plotly.service';
import { HttpClientModule } from '@angular/common/http';
import { CheckboxListComponent } from './app-checkbox-list/app-checkbox-list.component';
import { FormsModule } from '@angular/forms';
import { PlotlyService } from './plotly.service';
import { PlotlyComponent } from './plotly-component/plotly-component.component';



@NgModule({
  declarations: [
    AppComponent,
    PlotlyComponent,
    CheckboxListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [PlotlyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
