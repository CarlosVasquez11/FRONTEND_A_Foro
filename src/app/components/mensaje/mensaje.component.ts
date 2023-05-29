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
  modalSwitch: boolean;
  usuario: UsuarioModel=new UsuarioModel();
  id:any;
  jerarquia:string;
  contN1:any=0;
  contN2:any=0;
  contN3:any=0;
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
      nivel:new FormControl(''),
      jerarquia:new FormControl(''),
      id_usuario:new FormControl(this.id)
      
    }
    )
  }

  list(){
    /*this.listMensajes=[
      {
        "id_mensaje": 1,
        "contenido": "sdsd",
        "puntos": 0,
        "hora": new Date("2023-05-28"),
        "nivel":1,
        "jerarquia":10,
        "id_usuario": 55
      },
      {
        "id_mensaje": 2,
        "contenido": "sdsd",
        "puntos": 0,
        "hora": new Date("2023-05-28"),
        "nivel":2,
        "jerarquia":12,
        "id_usuario": 55
      },
      {
        "id_mensaje": 3,
        "contenido": "sdsd",
        "puntos": 0,
        "hora": new Date("2023-05-28"),
        "nivel":1,
        "jerarquia":20,
        "id_usuario": 55
      }
    ];*/
    
    
    
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
      }
    }
    )/*
    this.usuario={
      "id_usuario": 1,
      "nombre": "carlos",
      "imagen": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.tooltyp.com%2F8-beneficios-de-usar-imagenes-en-nuestros-sitios-web%2F&psig=AOvVaw0XPiDi2Z9jY4alqIK1z9g8&ust=1684965031852000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCLi7mIK2jP8CFQAAAAAdAAAAABAE"
      };*/
  }

  saveMensaje (){
    this.contN1= Number(localStorage.getItem('contN1'));
    this.contN1+=1;
    localStorage.setItem('contN1',this.contN1);
    this.formMensaje.get('jerarquia')?.setValue(this.contN1*10);
    this.formMensaje.get('nivel')?.setValue(1);
    console.log(this.formMensaje.value);
    
    this.mensajeService.saveMensaje(this.formMensaje.value).subscribe(resp=>{
      if(resp){
        this.list();
        console.log("mensaje enviado");
      }
    })
    this.formMensaje.get('contenido')?.setValue("");
  }
  saveMensajeN2(){
    this.modalSwitch=false;
    this.mensajeService.saveMensaje(this.formMensaje.value).subscribe(resp=>{
      if(resp){
        this.list();
        console.log("respuesta enviada");
      }
    })
    this.formMensaje.get('contenido')?.setValue("");
  }
  openModal(iN1Select: number){
    this.modalSwitch=true;
    this.contN2= Number(localStorage.getItem('contN2'));
    this.contN2+=1
    localStorage.setItem('contN2',this.contN2);
    this.jerarquia=String(iN1Select/10)+localStorage.getItem('contN2');
    this.formMensaje.get('jerarquia')?.setValue(this.jerarquia);
    this.formMensaje.get('nivel')?.setValue(2);
    console.log(this.formMensaje.value);
  }
  subirPuntos(mensaje: MensajeModel){
    
    this.mensajeService.subirPuntos(mensaje).subscribe(resp=>{
      if(resp){
        this.list();
      }
    })
  }
  disminuirPuntos(mensaje: MensajeModel){
    this.mensajeService.disminuirPuntos(mensaje).subscribe(resp=>{
      if(resp){
        this.list();
      }
    })
  }

}
