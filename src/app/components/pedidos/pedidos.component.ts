import { Component, OnInit } from '@angular/core';
import { GenericService } from '../../services/generic.service';
import { COMPRAS } from '../../ENDPOINTS';


@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  currentPedido : any
  enderecoCurrent : any
  pedidos : Array<any> = new Array<any>()
  viewDOM : boolean = false;
  modView : boolean

  constructor(private service : GenericService) {

    this.getAllPedidos()
    console.log(this.pedidos)
  }

  ngOnInit() {
  }

  getAllPedidos(){
    this.service.getAll(COMPRAS).subscribe(
      res=>{
        this.pedidos = res
        this.viewDOM = true
      }
    )
  }
  deletePedido(pedido){
    this.service.delete(COMPRAS, pedido.key)
    this.getAllPedidos()
  }


  detailPedido(pedido){
    this.currentPedido = pedido
    this.enderecoCurrent = pedido.usuario.endereco
    this.modView = true;
    console.log(this.currentPedido)
    console.log(this.enderecoCurrent)
  }
  accept(){
    this.currentPedido.status = true;
    this.service.put(COMPRAS, this.currentPedido)
  }



}
