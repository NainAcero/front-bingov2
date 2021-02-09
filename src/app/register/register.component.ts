import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../login/auth.service';
import { Usuario } from '../login/usuario';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  titulo: string = "Bingo 2021";
  usuario: Usuario;

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) {
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
  }

  register(): void{
    if(this.usuario.email == null || this.usuario.telefono == null || this.usuario.nombre == null){
      Swal.fire('Error en Registro', 'Ingrese todos los datos!', 'error');
      return;
    }

    this._authService.register(this.usuario).subscribe(response => {

      // console.log(response);
      this._authService.guardarUsuario(response.token);
      this._authService.guardarToken(response.token);
      let usuario = this._authService.usuario;

      this._router.navigate(['/home']).then(() => {
        window.location.reload();
      });
    }, err => {
      Swal.fire('Error Registro', 'Email o Teléfono ya registrados!', 'error');
    });
  }
}
