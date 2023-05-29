import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioModel } from 'src/app/model/usuarioModel';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  usuario: UsuarioModel;
  formUsuario: FormGroup =new FormGroup({});
  constructor(private usuarioService: UsuarioService, private router:Router){}

    ngOnInit(): void{
      
      this.formUsuario= new FormGroup({
        id_usuario: new FormControl(''),
        nombre: new FormControl(''),
        apellido: new FormControl('')

      }
      )
    }
    
    saveUsuario(){
      
      this.usuarioService.saveUsuarios(this.formUsuario.value).subscribe(resp=>{
        if(resp){
          this.usuario=resp;
          this.IrlistaMensaje(this.usuario.id_usuario);
        }
      })
    }
    IrlistaMensaje(id: number){
      this.router.navigate(['/mensaje/'+id]);

    }

    
  
}
