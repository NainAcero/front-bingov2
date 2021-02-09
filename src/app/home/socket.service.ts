import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  public socketStatus = false;

  constructor(
    private socket: Socket
  ) {
    this.checkStatus();
  }

  checkStatus(): void {

    this.socket.on('connect', function() {
      this.socketStatus = true;
    });

    this.socket.on('disconnect', () => {
      this.socketStatus = false;
    });
  }

  emit( evento: string, payload?: any, callback?: Function ) {
    this.socket.emit( evento, payload, callback );
  }

  listen( evento: string ) {
    return this.socket.fromEvent( evento );
  }

}
