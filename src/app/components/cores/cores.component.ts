import { Component, OnInit } from '@angular/core';
import { GenericService } from '../../services/generic.service';
import { Cor } from '../../models/cor';
import { CORES } from '../../ENDPOINTS';

@Component({
  selector: 'app-cores',
  templateUrl: './cores.component.html',
  styleUrls: ['./cores.component.css']
})
export class CoresComponent implements OnInit {

  colors : Array<Cor> = new Array<Cor>()
  color : Cor

  constructor(private service : GenericService) {
    this.color = new Cor()

    this.getColors()
  }

  async addColor(){
    await this.service.post(CORES, this.color)
    this.getColors()
    this.color = new Cor()
  }

  getColors(){
    this.service.getAll(CORES).subscribe(
      response=>{
        this.colors = response
      }
    )
  }

  async deleteColor(cor){
    await this.service.delete(CORES, cor.key)
    this.getColors()
  }

  ngOnInit() {
  }

}
