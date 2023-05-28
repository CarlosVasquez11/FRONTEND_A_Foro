import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MensajeModel } from 'src/app/model/mensajeModel';
import { UsuarioModel } from 'src/app/model/usuarioModel';
import { MensajeService } from 'src/app/service/mensaje.service';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-mensaje',
  templateUrl: './mensaje.component.html',
  styleUrls: ['./mensaje.component.css']
})
export class MensajeComponent implements OnInit {
  usuario: UsuarioModel=new UsuarioModel();
  id:any;
  formMensaje: FormGroup =new FormGroup({});
  listMensajes: MensajeModel[]=[];

  constructor(private mensajeService: MensajeService, private usuarioService:UsuarioService, private router: Router, private route: ActivatedRoute){}
  ngOnInit(): void {
    this.id=this.route.snapshot.paramMap.get('id');
    this.loadUserData();
    this.list();
    this.formMensaje= new FormGroup({
      id_mensaje: new FormControl(''),
      contenido: new FormControl(''),
      puntos: new FormControl(''),
      hora:new FormControl(''),
      id_usuario:new FormControl(this.id)
    }
    )
  }

  list(){
    this.mensajeService.listMensajesByIdUser(this.id).subscribe(resp=>{
      if(resp){
        this.listMensajes=resp;
      }
    }
  )
  }
  loadUserData(){
    console.log(this.usuario.id_usuario);
    this.usuarioService.returnUserById(this.id).subscribe(resp=>{
      if(resp){
        this.usuario=resp;
        console.log(this.usuario.id_usuario);
      }
    }
    )
  }

  saveMensaje (){
    console.log(this.formMensaje.value);
    this.mensajeService.saveMensaje(this.formMensaje.value).subscribe(resp=>{
      if(resp){
        this.list();
        console.log("mensaje enviado");
      }
    })
  }

}
