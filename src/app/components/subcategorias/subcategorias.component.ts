import { Component, OnInit } from '@angular/core';
import { GenericService } from '../../services/generic.service';
import { Cor } from '../../models/cor';
import { SUBCATEGORIAS, CATEGORIAS } from '../../ENDPOINTS';
import { SubCategoria } from '../../models/subCategoria';

@Component({
  selector: 'app-subcategorias',
  templateUrl: './subcategorias.component.html',
  styleUrls: ['./subcategorias.component.css']
})
export class SubcategoriasComponent implements OnInit {

  viewDOM: boolean;
  subcategoriaTemp: SubCategoria;
  subcategorias : Array<any> = new Array<any>()
  categorias : Array<any> = new Array<any>()

  
  constructor(private service : GenericService) {
    this.subcategoriaTemp = new SubCategoria()
    this.getSubCategorias()
    this.getCategorias()
  }

  
  async addSubCtegoria(){
    await this.service.post(SUBCATEGORIAS, this.subcategoriaTemp)
    this.getSubCategorias()
    this.subcategoriaTemp = new SubCategoria()
  }


  getSubCategorias(){
    this.service.getAll(SUBCATEGORIAS).subscribe(
      response=>{
        this.subcategorias = response
        this.viewDOM = true;
      }
    )
    
  }


  async deleteSubCategoria(subcategoria){
    await this.service.delete(SUBCATEGORIAS, subcategoria.key)
    this.getSubCategorias()
  }
  ngOnInit() {
  }

  async getCategorias(){
    await this.service.getAll(CATEGORIAS).subscribe(
      res=>{ 
        this.categorias = res;
        
      }
    )
  }

}
