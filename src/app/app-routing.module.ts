import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MultiSelectComponent } from './multi-select/multi-select.component';

const routes: Routes = [
  {
    path: 'http://localhost:4200/', 
    component: AppComponent
  },
  // { path: 'multiselect', component: MultiSelectComponent },
  // { path: '', redirectTo: 'multiselect', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

