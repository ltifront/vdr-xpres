import { Component, OnInit, Input} from '@angular/core';
import { GenericService } from '../../services/generic.service';
import { Categoria } from '../../models/categoria';
import { CATEGORIAS, CORES } from '../../ENDPOINTS';
import { Espessura } from '../../models/expessura';
import { Metragem } from '../../models/metragem';
import { Cor } from '../../models/cor';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-valores',
  templateUrl: './valores.component.html',
  styleUrls: ['./valores.component.css']
})
export class ValoresComponent implements OnInit {


  MASCARA_MILIMETROS = { align: "left", decimal: "",precision: "0", allowNegative: true, prefix: "", suffix: " mm", thousands: ""}
  // MAscara de valores mm
  MASCARA_MONEY = { align: "left", decimal: ",", precision: "2", prefix: "R$ ",allowNegative: true, suffix: "", thousands: "."}
  // Mascara de valores R$



  viewDOM : boolean                                        // Cond. para carregamento do DOM
  metragemModel : Metragem = new Metragem()                // Objeto modelo para adicionar metragens
  availableColor : Array<Cor> = new Array<Cor>()           // Cores cadastradas no banco
  categorias : Array<Categoria> = new Array<Categoria>();  // Categorias cadastradas no banco
  categoriaTemp: Categoria = new Categoria();              // Objeto modelo para adicionar categoria

  modEdit : boolean                                        // Modo Edição ?
  

  infos : any[] = [{cor : '',                              // Objeto modelo para espessuras por cores 
                   espessuras :  new Array<Metragem>()
                  }]
  
  constructor(private service : GenericService, public toastr: ToastrService) {
    this.infos[0].espessuras.push(this.metragemModel)
    this.categoriaTemp = new Categoria()
    this.getCategoriasAndColors()
  }

  ngOnInit(){
    this.categoriaTemp = new Categoria()
  }

  /*
  *
  * Método para obter as cores e categorias cadastradas no banco 
  * 
  */
  async getCategoriasAndColors(){
    await this.service.getAll(CORES).subscribe(
      res=>{  this.availableColor = res })
    await this.service.getAll(CATEGORIAS).subscribe(
      res=>{  
        this.categorias = res;
        this.viewDOM = true;
      })
      
  }
  /*
  *
  * Método para salvar a categoria criada no banco
  * 
  */
  addCategoria(){
    this.service.post(CATEGORIAS, this.categoriaTemp)
    this.getCategoriasAndColors()
  }
  /*
  *
  * Método para deletar uma determinada categoria do banco
  * 
  */
  deleteCategoria(categoria){
    this.service.delete(CATEGORIAS, categoria.key)
    this.getCategoriasAndColors()
  }
  /*
  *
  * Método para salvar as informações de cor e metragem no objeto Categoria
  * 
  */
  async saveMetragens(){
    let position = this.infos.length -1;
    await this.infos[position].espessuras.splice(-1,1)
    this.categoriaTemp.informacao = this.infos
  }
  /*
  *
  * Método para adicionar no DOM um novo form para adição de metragem
  * 
  */
  addMetragemForm(i, j){
    this.metragemModel = new Metragem()
    this.infos[i].espessuras.push(this.metragemModel)
    this.toastr.success('Metragem Adicionada!', 'Pronto',{
      timeOut: 3000
    })
  }
  async addFormInfo(){
    await this.infos.push({cor : '', espessuras :  new Array<Metragem>()})
    let position = this.infos.length -1;
    this.infos[position].espessuras.push(this.metragemModel)
    this.toastr.success('Grupo de Metragens Adicionada!', 'Pronto',{
      timeOut: 3000
    })
  }
  async saveCategoria(){
    if(this.modEdit){
      await this.infos.splice(-1,1)
      await this.service.put(CATEGORIAS, this.categoriaTemp)
      this.toastr.success('A Categoria foi Alterada!', 'Pronto',{
        timeOut: 3000
      })
    }else{
      await this.infos.splice(-1,1)
      await this.service.post(CATEGORIAS, this.categoriaTemp)
      this.toastr.success('A Categoria foi Adicionada!', 'Pronto',{
        timeOut: 3000
      })
    }
    this.categoriaTemp = new Categoria()
  }
  
  setInfo(categoria){
    this.modEdit = true
    this.categoriaTemp = categoria
    this.infos = categoria.informacao
    this.infos.push({cor : '', espessuras :  new Array<Metragem>()})
  }

  dismissEdit(){
    this.modEdit = false
    this.viewDOM = !this.viewDOM
    setTimeout(() => {
      this.viewDOM = !this.viewDOM  
    }, 1000);
    
    

  }


}
