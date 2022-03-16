import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { dashboardRoutes } from './dashboard.routes';
import { DashboardComponent } from './dashboard.component';

const rutasHijas: Routes = [
  {
        path: '', 
        component: DashboardComponent,
        children: dashboardRoutes,
        //canActivate: [AuthGuard]
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild( rutasHijas )
  ],
  exports:[
    RouterModule
  ]
})
export class DashboardRoutesModule { }
