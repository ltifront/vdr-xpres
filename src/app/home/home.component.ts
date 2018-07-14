import { Component, OnInit} from '@angular/core';
import { GenericService } from '../services/generic.service';
import { ENTREGA } from '../ENDPOINTS';
import { Entrega } from '../models/entrega';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {


  viewDOM : boolean;
  viewItem : string = '';

  
  entregaTemp
  entrega : any

  MASCARA_MONEY = { align: "left", decimal: ",", prefix: "R$ ", suffix: "", thousands: "."} 
  
  constructor(private service : GenericService) {
    this.entregaTemp = new Entrega()
    console.log(service.qnt_pedidos)
    this.getEntrega()
  }

  ngOnInit() {
  }

  getEntrega(){
    this.service.getAll(ENTREGA).subscribe(
      res =>{
        this.entrega = res[0];
        console.log(res)
        this.viewDOM = true;
      }
    )
  }

  setFrete(){
    this.entregaTemp.key = this.entrega.key
    this.entregaTemp.prazo = this.entrega.prazo
    console.log(this.entregaTemp)
    this.service.put(ENTREGA, this.entregaTemp)
  }

  setPrazo(){
    this.entregaTemp.key = this.entrega.key
    this.entregaTemp.frete = this.entrega.frete
    this.service.post(ENTREGA, this.entregaTemp)
  }

  setEntrega(){
    
  }
  /*
  * Método para modificar a view no DOM
  * 
  */

  viewSelect(view){
    this.viewItem = view
  }






}
