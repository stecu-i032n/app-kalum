import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardComponent} from './page/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MaterialModule } from '../shared/material.module';
import { SharedModule } from '../shared/shared.module';
import { CarrerasTecnicasModule } from '../carreras-tecnicas/carreras-tecnicas.module';
import { LoginModule } from '../login/login.module';
import { ExamenesAdmisionComponentModule } from '../examenes-admision/examenes-admision.module';




@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent
  ],
  imports: [
    CommonModule, 
    RouterModule,
    SharedModule,
    MaterialModule,
    CarrerasTecnicasModule,
    ExamenesAdmisionComponentModule,
    LoginModule
  ]
})
export class DashboardModule { }
