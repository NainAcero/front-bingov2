import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title: String = 'Bingo 2021';

  constructor(
    public authService: AuthService,
    private _router: Router
  ) { }

  ngOnInit(): void {
  }

  logout():void {

    Swal.fire('Logout',`Hola ${this.authService.usuario.nombre.toUpperCase()} has cerrado sesión con éxito!`,'success');
    this.authService.logout();
    this._router.navigate(['/login']);
  }
}
