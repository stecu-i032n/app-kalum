import { Component, OnInit, ViewChild } from '@angular/core';
import { tick } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { SidenavComponent } from 'src/app/modules/shared/components/sidenav/sidenav.component';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import Swal from 'sweetalert2';
import { ExamenAdmision } from '../../model/examen-admision.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ExamenesAdmisionService } from 'src/app/modules/shared/services/examenes-admision.service';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-examenes-admision',
  templateUrl: './examenes-admision.component.html',
  styles: [
  ]
})
export class ExamenesAdmisionComponent implements OnInit {
  displayColumns: string[] = ['Examen'];
  dataSource = new MatTableDataSource<ExamenAdmision>();


  @ViewChild(MatPaginator)
  paginador: MatPaginator;

  constructor(private examenAdmision: ExamenesAdmisionService, private sideNavComponent: SidenavComponent, public authService: AuthService) {

  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated() != true) {
      Swal.fire({
        title: 'No has iniciado sesión',
        text: `Inicia sesión para visualizar tús examenes`,
        icon: 'warning',
      });
      this.sideNavComponent.openFormLogin();
    }else{
      this.getExamenes();
    }
  }

  getExamenes() {
    const data = this.examenAdmision.getExamenes().subscribe((data: any) => {
      if (data && data.httpStatusCode) {
        if (data.httpStatusCode == 503 || data.httpStatusCode == 0) {
          Swal.fire('Carreras Tecnicas', 'Existe un error al consultar los Examenes', 'error');
        }
      } else {
        this.processsExamenResponse(data);
      }
    });
  }

  processsExamenResponse(data: any) {
    const dataCarreraTecnica: ExamenAdmision[] = [];
    let listaCarrerasTecnicas = data;
    listaCarrerasTecnicas.forEach((elemento: ExamenAdmision) => {
      dataCarreraTecnica.push(elemento);
    });
    this.dataSource = new MatTableDataSource<ExamenAdmision>(dataCarreraTecnica);
    this.dataSource.paginator = this.paginador;
  }
}
