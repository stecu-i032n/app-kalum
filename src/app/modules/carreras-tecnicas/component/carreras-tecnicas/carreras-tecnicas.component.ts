import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CarreraTecnica } from '../../model/carrera-tecnica.model';
import { CarreraTecnicaService } from 'src/app/modules/shared/services/carrera-tecnica.service';
import { MatPaginator } from '@angular/material/paginator';
import { FormCarreraTecnicaComponent } from '../../components/carreras-tecnicas/form-carrera-tecnica.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { LoginComponent } from 'src/app/modules/login/components/login/login.component';
import { FormRegisterAspiranteComponent } from '../../components/carreras-tecnicas/form-register-aspirante.component';

@Component({
  selector: 'app-carreras-tecnicas',
  templateUrl: './carreras-tecnicas.component.html',
  styles: [
  ]
})
export class CarrerasTecnicasComponent implements OnInit {
  displayColumns: string[] = ['carreraId', 'nombre', 'acciones'];
  dataSource = new MatTableDataSource<CarreraTecnica>();

  @ViewChild(MatPaginator)
  paginador: MatPaginator;


  ngOnInit(): void {
    this.getCarrerasTecnicas();
  }

  constructor(private carreraTecnicaService: CarreraTecnicaService, public dialog: MatDialog, public authService: AuthService) {

  }

  openEnrollmentCarreraTecnica(carreraId: string, nombre:string){
    console.log(carreraId);
    if(this.authService.isAuthenticated()){
      //ROLE_USER = 0 | ROLE_CANDIDATE = EXP-2023001 | ROLE_STUDENT = 2023001
      if(this.authService.usuario.identificationId == '0'){
        const formRegisterAspirante = this.dialog.open(FormRegisterAspiranteComponent, {width: '450px'});
      }
    }else {
      Swal.fire({
        icon: 'info',
        title: 'Asignación de Carrera Técnica',
        html: 'Inicia sesión para realizar esta acción',
        footer: 'Kalum v1.0.0'
      }).then(result => {
        if(result.isConfirmed){
          this.dialog.open(LoginComponent, {width: '450x'});
        }
      })
    }
  }

  getCarrerasTecnicas() {
    const data = this.carreraTecnicaService.getCarreras().subscribe((data: any) => {
      if (data && data.httpStatusCode) {
        if (data.httpStatusCode == 503 || data.httpStatusCode == 0) {
          Swal.fire('Carreras Tecnicas', 'Existe un error al consultar el listado de carreras técnicas', 'error');
        }
      } else {
        this.processsCarrerasTecnicasResponse(data);
      }
    });
    //if (!this.isObjectEmpty(data)) {
    //  this.processsCarrerasTecnicasResponse(data);
    //};
  }

  isObjectEmpty(objectName: any) {
    return Object.keys(objectName).length === 0 && objectName.constructor === Object;
  }

  processsCarrerasTecnicasResponse(data: any) {
    const dataCarreraTecnica: CarreraTecnica[] = [];
    let listaCarrerasTecnicas = data;
    listaCarrerasTecnicas.forEach((elemento: CarreraTecnica) => {
      dataCarreraTecnica.push(elemento);
    });
    this.dataSource = new MatTableDataSource<CarreraTecnica>(dataCarreraTecnica);
    this.dataSource.paginator = this.paginador;
  }

  openFormCarreraTecnica() {
    const dialogRef = this.dialog.open(FormCarreraTecnicaComponent, { width: '450px' })
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.getCarrerasTecnicas();
      } else if (result == 2) {
        Swal.fire('Carreras Técnicas', 'Upss!!! se genero un error al momento de crear el recurso', 'error');
      }
    });
  }

  editFormCarreraTecnica(carreraId: String, nombre: String){
    const dialogRef = this.dialog.open(FormCarreraTecnicaComponent, {width:'450px', data: {carreraId, nombre}});
    dialogRef.afterClosed().subscribe(result => {
      this.getCarrerasTecnicas();
    })
  }

  deleteCarreraTecnica(carreraId: any) {
    Swal.fire({
      title: 'Carreras técnicas',
      text: '¿Está seguro de eliminar la carrera técnica?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
      reverseButtons: true,
    }).then(result => {
      if (result.isConfirmed) {
        this.carreraTecnicaService.deleteCarreraTecnica(carreraId).subscribe((data: any) => {
          if (data.httpStatusCode && data.httpStatusCode == 503) {
            Swal.fire('Carreras técnicas', 'Hubo un error al momento de eliminar el registro', 'error');
          } else {
            Swal.fire('Carreras Técnicas', 'Registro eliminado', 'success');
            this.getCarrerasTecnicas();
          }
        })
      }
    });
  }
}