import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-paginate',
  templateUrl: './paginate.component.html',
  styleUrls: ['./paginate.component.css']
})
export class PaginateComponent implements OnInit {

  @Input() paginador: any;
  totalPaginas : number;

  paginas: Array<number> = [];

  constructor() { }

  ngOnInit(): void {
    this.totalPaginas = Math.ceil(this.paginador.total / 4);

    for (let i = 0; i < this.totalPaginas ; i++) {
      this.paginas.push(i * 4);
    }
    this.initPaginador();
  }

  ngOnChanges(changes: SimpleChanges){

    let paginadorActual = changes['paginador'];
    if(paginadorActual.previousValue) {
      this.initPaginador()
    }
  }

  private initPaginador(){

  }

}
