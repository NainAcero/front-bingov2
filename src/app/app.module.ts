import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { SwiperModule } from 'swiper/angular';
import { AdministracionComponent } from './administracion/administracion.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './login/guards/auth.guard';
import { RoleGuard } from './login/guards/role.guard';
import { LoginComponent } from './login/login.component';
import { PaginateComponent } from './paginate/paginate.component';
import { RegisterComponent } from './register/register.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { VerificarComponent } from './verificar/verificar.component';
import { InicioComponent } from './inicio/inicio.component';

var _token = null;

if(sessionStorage.getItem('token') != null)  _token = sessionStorage.getItem('token');

// const config: SocketIoConfig = { url: 'http://localhost:3000',
//   options: { transports: ['websocket'], allowUpgrades : true, query: `token=${_token}` } };

  const config: SocketIoConfig = { url: 'http://nxn-informatic-solution.tk',
  options: { transports: ['websocket'], allowUpgrades : true, query: `token=${_token}` } };

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'inicio', component: InicioComponent},
  {path: 'loginAdmin', component: LoginAdminComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: HomeComponent, canActivate:[AuthGuard] },
  {path: 'usuarios/page/:page', component: UsuariosComponent, canActivate:[AuthGuard, RoleGuard] , data: {role: 'ADMINISTRADOR'}},
  {path: 'verificar', component: VerificarComponent, canActivate:[AuthGuard, RoleGuard] , data: {role: 'ADMINISTRADOR'}},
  {path: 'administracion', component: AdministracionComponent, canActivate:[AuthGuard, RoleGuard] , data: {role: 'ADMINISTRADOR'}},
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    RegisterComponent,
    UsuariosComponent,
    AdministracionComponent,
    PaginateComponent,
    LoginAdminComponent,
    VerificarComponent,
    InicioComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    SocketIoModule.forRoot(config),
    SwiperModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
