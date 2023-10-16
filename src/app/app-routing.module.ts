import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: 'http://localhost:4200/', // This is the default route, matching http://localhost:4200/
    component: AppComponent // Replace 'YourDefaultComponent' with the actual component you want to display at the root URL.
  },
  // Add more route configurations for other pages or components as needed.
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
