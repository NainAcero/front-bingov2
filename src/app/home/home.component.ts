import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import SwiperCore, { Mousewheel, Pagination } from "swiper/core";
import { AuthService } from '../login/auth.service';
import { BolillaService } from '../services/bolilla.service';
import { LetraService } from '../services/letra.service';
import { TalonarioService } from '../services/talonario.service';
import { SocketService } from './socket.service';

SwiperCore.use([Pagination,Mousewheel]);
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  bolillas = [];
  cartillas = [];
  letra: string = "";
  swiperConfig = {
      spaceBetween: 10,
      mousewheel: true,
      pagination: {
      clickable: true,
      dynamicBullets: true,
      dynamicMainBullets: 3,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (index + 1) + '</span>';
      }
    },
    breakpoints:{
      578:{
        direction : 'vertical'
      }
    }
  };

  constructor(
    private _authService: AuthService,
    public _socketService: SocketService,
    public _talonarioService: TalonarioService,
    private _bolillaService: BolillaService,
    private _letraService: LetraService,
  ) {
  }

  ngOnInit(): void {
    // this._socketService.emit('sacar_numero', { nombre: 'Nain Acero' });

    this._letraService.getLetra().subscribe(response => {
      this.letra = response.letra[0].letra;
    });

    this.listenSocket();
    this.listenReset();
    this.listenDelete();
    this._talonarioService.getTalonario()
    .subscribe(response => {
      console.log(response);

      this.cartillas = response.data;
    });

    this._bolillaService.getBolilla()
    .subscribe(response => {

      response.bolillas.forEach((bolilla) => {
        this.bolillas.push(bolilla.numero);
      });
    });
  }

  listenSocket(): void {
    this._socketService.listen('obtener_numero').subscribe( (response: Number) => {
      setTimeout(()=>{

        this.bolillas.push(response);

        this.cartillas = this.cartillas.map(element => {
          element.talonario.map(value => {

            if(value.numero == response){
              value.salio = 1;
            }

            return value;
          });

          return element;
        })

       }, 12000)

      // console.log(this.cartillas);
    });


  }

  listenDelete(): void {
    this._socketService.listen('delete_update').subscribe( (response: Number) => {
      this.bolillas.push(response);

      this.cartillas = this.cartillas.map(element => {
        element.talonario.map(value => {

          if(value.numero == response){
            value.salio = 0;
          }

          return value;
        });

        return element;
      })

      // console.log(this.cartillas);
    });


  }

  listenReset(): void {
    this._socketService.listen( 'resetear_user' ).subscribe( (data: any) => {
      location.reload(true);
    });
  }

  bingo(code: string){
    var check = 1;

    if(check == 1){

      var user = {
        id: this._authService.usuario._id,
        nombre: this._authService.usuario.nombre.toUpperCase(),
        email: this._authService.usuario.email,
        telefono: this._authService.usuario.telefono,
        code: code,
        hour: new Date().getHours(),
        minutos: new Date().getMinutes(),
        segundos: new Date().getSeconds(),
      };

      this._socketService.emit('bingo_emit', user);

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Se marco su bingo',
        showConfirmButton: false,
        timer: 1500
      });
    }else{

      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Catillas Incompletas',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

}
