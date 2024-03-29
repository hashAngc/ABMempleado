import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadoServiceService } from 'src/app/services/empleado-service.service';
import { MensajeConfirmacionComponent } from '../shared/mensaje-confirmacion/mensaje-confirmacion.component';
// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];
@Component({
  selector: 'app-list-empleado',
  templateUrl: './list-empleado.component.html',
  styleUrls: ['./list-empleado.component.css']
})
export class ListEmpleadoComponent {
  displayedColumns: string[] = ['nombreCompleto', 'telefono', 'correo', 'fechaIngreso', 'estadoCivil', 'sexo', 'acciones'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator
  @ViewChild(MatSort, { static: true })
  sort!: MatSort;;
  listEmpleado: any[] = []
  constructor(private servicioEmpleado: EmpleadoServiceService,public dialog: MatDialog,public snackbar:MatSnackBar) {

  }
  ngOnInit(): void {
 
    this.cargarEmpleado()
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  cargarEmpleado() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort
    this.listEmpleado = this.servicioEmpleado.getEmpleados()
    this.dataSource = new MatTableDataSource(this.listEmpleado);
    console.log(this.listEmpleado)
  }
  eliminarEmpleado(index: number) {
    const dialogRef = this.dialog.open(MensajeConfirmacionComponent, {
      width:'350px',
      data: {mensaje: '¿esta seguro de eliminar?'},
    });
    dialogRef.afterClosed().subscribe(result => {
if(result==='Aceptar'){
  this.servicioEmpleado.eliminarEmpleado(index)
  this.cargarEmpleado()
  this.snackbar.open('Se elimino con exito!','',{
    duration:3000,
    

  })
}
      
    });
    
  }
}
