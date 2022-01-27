import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { empleado } from 'src/app/models/empleado';
import { MatDialog } from '@angular/material/dialog';
import { MensajeConfirmacionComponent } from '../shared/mensaje-confirmacion/mensaje-confirmacion.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-empleado',
  templateUrl: './list-empleado.component.html',
  styleUrls: ['./list-empleado.component.css']
})
export class ListEmpleadoComponent implements OnInit, AfterViewInit {
  listaEmpleados: empleado[] = []
  displayedColumns: string[] = ['nombre', 'telefono', 'correo', 'fechaIngreso', 'estadoCivil', 'sexo', 'acciones'];
  dataSource = new MatTableDataSource<empleado>(this.listaEmpleados);

  //hacer referencia a un componente hijo
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _empleadoSevice: EmpleadoService, public dialog: MatDialog, private _snackBar: MatSnackBar) {
    this.cargarEmpleados();  
  }
  ngOnInit(): void {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cargarEmpleados(){
    this.listaEmpleados = this._empleadoSevice.getEmpleados();
    this.dataSource = new MatTableDataSource<empleado>(this.listaEmpleados);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  eliminarEmpleado(index:number){
    const dialogRef = this.dialog.open(MensajeConfirmacionComponent, {
      width: '350px',
      data: {mensaje:"¿Está seguro que desea eliminar el empleado?"}
    });
    dialogRef.afterClosed().subscribe({
      next: d => {
        if(d === 'aceptar'){
          this._empleadoSevice.eliminarEmpleado(index);
          this.cargarEmpleados()
          this._snackBar.open("Empleado eliminado correctamente",'',{duration:3000})
        }

      }

    });

    
  }
}
