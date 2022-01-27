import { Injectable } from '@angular/core';
import { empleado } from '../models/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  listEmpleados:empleado[] = [
    {nombre:"Agustin",correo:"correo@correo.com",telefono:114523569,sexo:"masculino",fechaIngreso:new Date, estadoCivil:"Soltero/a"},
    {nombre:"Alfonzo",correo:"correo@correo.com",telefono:168432186,sexo:"masculino",fechaIngreso:new Date, estadoCivil:"Soltero/a"},
    {nombre:"Agustina",correo:"correo@correo.com",telefono:156468456,sexo:"femenino",fechaIngreso:new Date, estadoCivil:"Viudo/a"},
    {nombre:"Maria",correo:"correo@correo.com",telefono:46843846,sexo:"femenino",fechaIngreso:new Date, estadoCivil:"Casado/a"},
    {nombre:"Martin",correo:"correo@correo.com",telefono:6486466874,sexo:"masculino",fechaIngreso:new Date, estadoCivil:"Casado/a"},
    {nombre:"Jose",correo:"correo@correo.com",telefono:5468748679,sexo:"masculino",fechaIngreso:new Date, estadoCivil:"Soltero/a"},
    {nombre:"Rodrigo",correo:"correo@correo.com",telefono:6456568448,sexo:"masculino",fechaIngreso:new Date, estadoCivil:"Casado/a"},
    {nombre:"Owen",correo:"correo@correo.com",telefono:646846455,sexo:"masculino",fechaIngreso:new Date, estadoCivil:"Casado/a"},

  ]

  constructor() { }

  getEmpleados(){
    return this.listEmpleados.slice();
  }
  getEmpleado(id: number){
    return this.listEmpleados[id]
  }
  eliminarEmpleado(index:number){
    this.listEmpleados.splice(index,1);    
  }
  addEmpleado(empleado:empleado){
    this.listEmpleados.unshift(empleado)
  }
  editEmpleado(empleado:empleado, id:number){
    this.listEmpleados[id] = empleado
  }
}
