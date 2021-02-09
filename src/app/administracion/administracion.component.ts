import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { SocketService } from '../home/socket.service';
import { AuthService } from '../login/auth.service';
import { Talonario } from '../models/talonario';
import { BolillaService } from '../services/bolilla.service';
import { LetraService } from '../services/letra.service';
import { TalonarioService } from '../services/talonario.service';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css']
})
export class AdministracionComponent implements OnInit, AfterViewInit  {

  @ViewChild('myInput') number: ElementRef;
  bolillas:number[] = [];
  letra: String = "";
  uid: String = "";
  numero: Number;
  numberDelete: Number;
  bingo = ["B","I","N","G","O"];
  // TODO: reemplazar con mongodb
  elementos = [
    [
      {"numero" : 1,"salio" : 0},{"numero" : 2,"salio" : 0},{"numero" : 3,"salio" : 0},{"numero" : 4,"salio" : 0},{"numero" : 5,"salio" : 0},
      {"numero" : 6,"salio" : 0},{"numero" : 7,"salio" : 0},{"numero" : 8,"salio" : 0},{"numero" : 9,"salio" : 0},{"numero" : 10,"salio" : 0},
      {"numero" : 11,"salio" : 0},{"numero" : 12,"salio" : 0},{"numero" : 13,"salio" : 0},{"numero" : 14,"salio" : 0},{"numero" : 15,"salio" : 0}
    ],
    [
      {"numero" : 16,"salio" : 0},{"numero" : 17,"salio" : 0},{"numero" : 18,"salio" : 0},{"numero" : 19,"salio" : 0},{"numero" : 20,"salio" : 0},
      {"numero" : 21,"salio" : 0},{"numero" : 22,"salio" : 0},{"numero" : 23,"salio" : 0},{"numero" : 24,"salio" : 0},{"numero" : 25,"salio" : 0},
      {"numero" : 26,"salio" : 0},{"numero" : 27,"salio" : 0},{"numero" : 28,"salio" : 0},{"numero" : 29,"salio" : 0},{"numero" : 30,"salio" : 0}
    ],
    [
      {"numero" : 31,"salio" : 0},{"numero" : 32,"salio" : 0},{"numero" : 33,"salio" : 0},{"numero" : 34,"salio" : 0},{"numero" : 35,"salio" : 0},
      {"numero" : 36,"salio" : 0},{"numero" : 37,"salio" : 0},{"numero" : 38,"salio" : 0},{"numero" : 39,"salio" : 0},{"numero" : 40,"salio" : 0},
      {"numero" : 41,"salio" : 0},{"numero" : 42,"salio" : 0},{"numero" : 43,"salio" : 0},{"numero" : 44,"salio" : 0},{"numero" : 45,"salio" : 0}
    ],
    [
      {"numero" : 46,"salio" : 0},{"numero" : 47,"salio" : 0},{"numero" : 48,"salio" : 0},{"numero" : 49,"salio" : 0},{"numero" : 50,"salio" : 0},
      {"numero" : 51,"salio" : 0},{"numero" : 52,"salio" : 0},{"numero" : 53,"salio" : 0},{"numero" : 54,"salio" : 0},{"numero" : 55,"salio" : 0},
      {"numero" : 56,"salio" : 0},{"numero" : 57,"salio" : 0},{"numero" : 58,"salio" : 0},{"numero" : 59,"salio" : 0},{"numero" : 60,"salio" : 0}
    ],
    [
      {"numero" : 61,"salio" : 0},{"numero" : 62,"salio" : 0},{"numero" : 63,"salio" : 0},{"numero" : 64,"salio" : 0},{"numero" : 65,"salio" : 0},
      {"numero" : 66,"salio" : 0},{"numero" : 67,"salio" : 0},{"numero" : 68,"salio" : 0},{"numero" : 69,"salio" : 0},{"numero" : 70,"salio" : 0},
      {"numero" : 71,"salio" : 0},{"numero" : 72,"salio" : 0},{"numero" : 73,"salio" : 0},{"numero" : 74,"salio" : 0},{"numero" : 75,"salio" : 0}
    ],
  ];

  users = [

  ];

  swiperConfig = {
    spaceBetween: 10,
    mousewheel: true,
    pagination: {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + '</span>';
    }
  }
};

  cartillas = [];
  talonario: any;
  _id: String;

  constructor(
    private _authService: AuthService,
    private _talonarioService: TalonarioService,
    private _socketService: SocketService,
    private _bolillaService: BolillaService,
    private _letraService: LetraService
  ) {
  }
  ngAfterViewInit(): void {
    this.number.nativeElement.focus();
  }

  ngOnInit(): void {
    this.listenSocket();
    this.listenBingo();
    this.listenReset();

    this._letraService.getLetra().subscribe(response => {
      this.letra = response.letra[0].letra;
      this.uid = response.letra[0].uid;
    });

    this._bolillaService.getBolilla()
    .subscribe(response => {

      response.bolillas.forEach((bolilla) => {
        this.bolillas.push(bolilla.numero);
        this.elementos = this.elementos.map(element => {
          element.map(value => {

            if(value.numero == bolilla.numero){
              value.salio = 1;
            }

            return value;
          });

          return element;
        });
      });
    });
  }

  sacar_numero(){
    if(this.numero != null){
      Swal.fire({
        title: 'Estas seguro de sacar el número ' + this.numero + ' ?',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: `Save`,
        denyButtonText: `Don't save`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this._socketService.emit('sacar_numero', this.numero);
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }
      })
    }else{
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Ingrese un número ',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

  listenSocket(): void {
    this._socketService.listen( 'obtener_numero' ).subscribe( (data: any) => {
      this.bolillas.push(data);
      this.numero = null;
      this.elementos = this.elementos.map(element => {
        element.map(value => {

          if(value.numero == data){
            value.salio = 1;
          }

          return value;
        });

        return element;
      });
      // Swal.fire({
      //   position: 'top-end',
      //   icon: 'success',
      //   title: 'Número: ' + data,
      //   showConfirmButton: false,
      //   timer: 1500
      // })
    });
  }

  listenReset(): void {
    this._socketService.listen( 'resetear_user' ).subscribe( (data: any) => {
      location.reload(true);
    });
  }

  listenBingo(): void {
    this._socketService.listen( 'bingo_response' ).subscribe( (data: any) => {
      this.users.push(data);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Bingo: ' + data.nombre,
        showConfirmButton: false,
        timer: 1500
      })
    });
  }

  showBingos(code){
    this._talonarioService.getTalonarioById(code).subscribe(response => {
      this.talonario = response.data;
      if(this.letra == "C" || this.letra == "c") this.ciis_c();
      if(this.letra == "II" || this.letra == "ii") this.ciis_ii();
      if(this.letra == "S" || this.letra == "s") this.ciis_s();
    });
  }

  ciis_c(){
    this.talonario.talonario[0].color = 'bg-dark';
    this.talonario.talonario[1].color = 'bg-dark';
    this.talonario.talonario[2].color = 'bg-dark';
    this.talonario.talonario[3].color = 'bg-dark';
    this.talonario.talonario[4].color = 'bg-dark';
    this.talonario.talonario[5].color = 'bg-dark';
    this.talonario.talonario[10].color = 'bg-dark';
    this.talonario.talonario[15].color = 'bg-dark';
    this.talonario.talonario[20].color = 'bg-dark';
    this.talonario.talonario[21].color = 'bg-dark';
    this.talonario.talonario[22].color = 'bg-dark';
    this.talonario.talonario[23].color = 'bg-dark';
    this.talonario.talonario[24].color = 'bg-dark';
  }

  ciis_ii(){
    this.talonario.talonario[1].color = 'bg-dark';
    this.talonario.talonario[6].color = 'bg-dark';
    this.talonario.talonario[11].color = 'bg-dark';
    this.talonario.talonario[16].color = 'bg-dark';
    this.talonario.talonario[21].color = 'bg-dark';
    this.talonario.talonario[3].color = 'bg-dark';
    this.talonario.talonario[8].color = 'bg-dark';
    this.talonario.talonario[13].color = 'bg-dark';
    this.talonario.talonario[18].color = 'bg-dark';
    this.talonario.talonario[23].color = 'bg-dark';
  }

  ciis_s(){
    this.talonario.talonario[0].color = 'bg-dark';
    this.talonario.talonario[1].color = 'bg-dark';
    this.talonario.talonario[2].color = 'bg-dark';
    this.talonario.talonario[3].color = 'bg-dark';
    this.talonario.talonario[4].color = 'bg-dark';
    this.talonario.talonario[5].color = 'bg-dark';
    this.talonario.talonario[10].color = 'bg-dark';
    this.talonario.talonario[11].color = 'bg-dark';
    this.talonario.talonario[13].color = 'bg-dark';
    this.talonario.talonario[14].color = 'bg-dark';
    this.talonario.talonario[19].color = 'bg-dark';
    this.talonario.talonario[20].color = 'bg-dark';
    this.talonario.talonario[21].color = 'bg-dark';
    this.talonario.talonario[22].color = 'bg-dark';
    this.talonario.talonario[23].color = 'bg-dark';
    this.talonario.talonario[24].color = 'bg-dark';
  }

  cerrarModal(){
    if(this.cartillas.length != 0){
      this.cartillas = [];
    }
  }

  resetear(){
    Swal.fire({
      title: 'Estas seguro de resetear el juego?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: `Resetear`,
      denyButtonText: `No Resetear`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this._talonarioService.resetTalonario()
        .subscribe(response => {
          Swal.fire('BINGO - ESIS', 'Juego Reseteado con éxito', 'success');
        });
      } else if (result.isDenied) {
        Swal.fire('No se ha reseteado el juego', '', 'info')
      }
    })
  }

  actualizar(){
    this._socketService.emit('resetear', this.numero);
  }

  verificar(cartilla: any){
    var con = 0;
    cartilla.talonario.forEach(element => {
      if(element.salio == 1 ){
        this.bolillas.forEach(bolilla => {
          if(bolilla == element.numero){
            con ++;
          }
        });
      }
    });
    if(con >= 24){
      Swal.fire('BINGO - ESIS', 'Cartilla Verificada', 'success');
    }else{
      Swal.fire('BINGO - ESIS', 'Cartilla No llena', 'error');
    }
  }

  delete(){
    Swal.fire({
      title: 'Estas seguro de eliminar el número ' + this.numberDelete,
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: `Eliminar`,
      denyButtonText: `No Resetear`,
    }).then((result) => {
      if (result.isConfirmed) {
        this._socketService.emit('delete_numero', this.numberDelete);
        this.bolillas = this.bolillas.filter(elemento => elemento != this.numberDelete);
        this.elementos.forEach(element => {
          element.forEach(x => {
            if(x.numero == this.numberDelete){
              x.salio = 0;
            }
          });
        });

        this.numberDelete = null;

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Se borro Correctamente ',
          showConfirmButton: false,
          timer: 1500
        })
      } else if (result.isDenied) {
        Swal.fire('No se ha eliminado el número', '', 'info');
      }
    })
  }

  update_Letra(){
    const data = {
      "letra": this.letra,
      "uid": this.uid
    }
    this._letraService.updateLetra(data).subscribe(response => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Juego Actualizado',
        showConfirmButton: false,
        timer: 1500
      })
    });
  }
}
