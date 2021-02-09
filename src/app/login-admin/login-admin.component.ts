import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../login/auth.service';
import { Usuario } from '../login/usuario';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {

  titulo: string = "ADMINISTRADORES";
  usuario: Usuario;

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) {
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
    if(this._authService.token != null){
      this._authService.renew(this._authService.token).subscribe(response => {

        this._authService.guardarUsuario(response.token);
        this._authService.guardarToken(response.token);

        this._router.navigate(['/home']).then(() => {
          window.location.reload();
        });
      }, err => {
        console.log('Error!!! Token no válido');
      });
    }
  }

  login(): void{
    if(this.usuario.email == null || this.usuario.telefono == null){
      Swal.fire('Error Login', 'Ingrese todos los datos!', 'error');
      return;
    }

    this._authService.loginAdmin(this.usuario).subscribe(response => {

      // console.log(response);
      this._authService.guardarUsuario(response.token);
      this._authService.guardarToken(response.token);

      this._router.navigate(['/home']).then(() => {
        window.location.reload();
      });
    }, err => {
      Swal.fire('Error Login', 'Email o Teléfono incorrecto!', 'error');
    });
  }

}
