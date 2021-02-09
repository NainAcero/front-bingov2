import { Component, OnInit } from '@angular/core';
import { Talonario } from '../models/talonario';
import { LetraService } from '../services/letra.service';
import { TalonarioService } from '../services/talonario.service';

@Component({
  selector: 'app-verificar',
  templateUrl: './verificar.component.html',
  styleUrls: ['./verificar.component.css']
})
export class VerificarComponent implements OnInit {

  buscar: String;
  talonario: any;
  letra: string = "";

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

  constructor(
    private _talonarioService: TalonarioService,
    private _letraService: LetraService,
  ) {
  }

  ngOnInit(): void {
    this._letraService.getLetra().subscribe(response => {
      this.letra = response.letra[0].letra;
    });
  }

  buscarTalonario(){

    this._talonarioService.getTalonarioById(this.buscar).subscribe(response => {
      this.talonario = response.data;
      this.buscar = "";
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
}
