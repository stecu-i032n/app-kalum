import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarrerasTecnicasComponent } from './component/carreras-tecnicas/carreras-tecnicas.component';
import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormCarreraTecnicaComponent } from './components/carreras-tecnicas/form-carrera-tecnica.component';
import { FormRegisterAspiranteComponent } from './components/carreras-tecnicas/form-register-aspirante.component';



@NgModule({
  declarations: [
    CarrerasTecnicasComponent,
    FormCarreraTecnicaComponent,
    FormRegisterAspiranteComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CarrerasTecnicasModule { }
