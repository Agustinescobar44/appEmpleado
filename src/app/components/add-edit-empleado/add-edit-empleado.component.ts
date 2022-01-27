import { core } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { empleado } from 'src/app/models/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';



@Component({
  selector: 'app-add-edit-empleado',
  templateUrl: './add-edit-empleado.component.html',
  styleUrls: ['./add-edit-empleado.component.css'],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'primary' },
  }]
})
export class AddEditEmpleadoComponent implements OnInit {

  estados: string[] = ['Casado/a' , 'Soltero/a', 'Viudo/a' , 'Divorciado/a']
  idEmpleado: any;
  accion= "Crear";
  myForm: FormGroup;

  constructor(  
    private _fb: FormBuilder, 
    private _empleadoService: EmpleadoService, 
    private router:Router, 
    private snackbar:MatSnackBar, 
    private aRoute:ActivatedRoute
  ){
  this.myForm = this._fb.group({
    nombre:['', [Validators.required, Validators.maxLength(20)]],
    correo:['', [Validators.required, Validators.email]],
    fechaIngreso:['', [Validators.required]],
    telefono:['', [Validators.required]],
    estadoCivil:['', [Validators.required]],
    sexo:['', [Validators.required]],
  })
  this.idEmpleado= this.aRoute.snapshot.params['id']
  }

  ngOnInit(): void {
    if(this.idEmpleado){
      this.accion = "Editar"
      this.esEdit();
      
    } 
  }

  esEdit(){
    const empleado: empleado = this._empleadoService.getEmpleado(this.idEmpleado);
    this.myForm.patchValue({
      nombre: empleado.nombre,
      correo: empleado.correo,
      fechaIngreso: empleado.fechaIngreso,
      telefono: empleado.telefono,
      sexo: empleado.sexo,
      estadoCivil: empleado.estadoCivil,
    })
  }

  guardarEmpleado(){
    //validar el formulario
    if(!this.myForm.valid) return;

    //crear el empleado
    const empleado: empleado = this.crearEmpleado();
    //guardar avisar y navegar
    this._empleadoService.addEmpleado(empleado)
    this.snackbar.open('El empleado fue registrado con exito!', '', {
      duration:5000
    });
    this.router.navigate(['']);
  }

  editEmpleado(){
    //validar el formulario
    if(!this.myForm.valid) return;

    const empleado:empleado = this.crearEmpleado()
    this._empleadoService.editEmpleado(empleado,this.idEmpleado);
    this.snackbar.open('El empleado fue actualizado con exito!', '', {
      duration:5000
    });
    this.router.navigate(['']);
  }

  private crearEmpleado() {
    const { nombre, correo, fechaIngreso, telefono, estadoCivil, sexo } = this.myForm.value;
    const empleado: empleado = {
      nombre: nombre,
      correo: correo,
      fechaIngreso: fechaIngreso,
      telefono: telefono,
      estadoCivil: estadoCivil,
      sexo: sexo
    };
    return empleado;
  }
}
