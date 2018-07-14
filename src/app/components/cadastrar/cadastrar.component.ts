import { Component, OnInit, Input, OnChanges} from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { Produto } from '../../models/produto';
import { GenericService } from '../../services/generic.service';
import { Kit } from '../../models/kit';
import { StorageService } from '../../services/storage.service';
import { Categoria } from '../../models/categoria';
import { CATEGORIAS, PRODUTOS, MODELOS, SUBCATEGORIAS } from '../../ENDPOINTS';
import { ToastrService } from 'ngx-toastr';
import { SubCategoria } from '../../models/subCategoria';


@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {
  
  
  MASCARA_MONEY = { align: "left", decimal: ",", prefix: "R$ ", suffix: "", thousands: "."} 
  // Máscara para valores R$

  viewDOM: boolean;             
  alertMessage: string;           //  Mensagem de Alerta Atual
  imgAdd : boolean               //  Condicional para habilitar a remoção de uma imagem adicionada
  categorias : Array<any>       //    Categorias Cadastradas no sistema
  Subcategorias : Array<any>   // Subcategorias cadastradas no sistema


  corteH : number;
  corteV : number;

  @Input()
  produto : Produto = new Produto()           //   Objeto do produto
  @Input()
  modEdit : boolean                         // Modo edição ? 
  

  kits : Array<any> = [  //  Objeto dos Kits
      { nome : '' , descricao : '', imgLink : '', imgId : '', preco : 0 }] 
  
    
  constructor(private fireStore: StorageService, private service : GenericService, public toastr: ToastrService) {
            this.produto = new Produto() 
            this.produto.kits = new Array<any>()
            this.getCategorias()
            this.produto.corte_v = false , this.produto.fixo = false, this.produto.porta = false;
            
  }
  ngOnInit(){
    if(this.modEdit){
      if(this.produto.kits){ 
        this.kits = this.produto.kits
      }
    }else{
       this.produto = new Produto()
       this.produto.kits = new Array<Kit>()
       this.produto.cortes = new Array<Array<number>>()
    } 
  }
  /*
   *
   *Seleção do arquivo de imagem do produto e dos kits 
   *
  */
  async chooseFile(event, posicao, conditional) { 
    this.imgAdd = true;
    let imgFile = event.target.files as FileList;
    let info = await this.fireStore.upload(imgFile.item(0))
    if(conditional){
      this.kits[posicao].imgLink = info.link;
      this.kits[posicao].imgId = info.id;
    }else{
      this.produto.imgLink = info.link;
      this.produto.imgId = info.id
    }
  }
  /*
   *
   *Método Responsável por remover imagens
   *
  */
 async deleteImg(imgId){
    this.imgAdd = false;
    this.produto.imgId = '';
    this.produto.imgLink = '';
    await this.fireStore.deleteImg(imgId)
    this.alertMessage = 'Imagem Exlcuida com Sucesso!'
  }
  /*
   *
   *Método Responsável por Salvar ou Atualizar o produto no banco (firebase)
   *
  */
  async cadastrarProduto(){
    if(this.productValidator()){
      if(this.modEdit){
        await this.service.put(PRODUTOS, this.produto)
        this.toastr.success('Produto Alterado com sucesso!', 'Pronto',{
          timeOut: 6000
        })
      }else{
        await this.service.post('produtos', this.produto)
        this.toastr.success('Produto Adicionado com sucesso!', 'Pronto',{
          timeOut: 6000
        })
        this.produto = new Produto()
        this.kits = new Array<Kit>()
      }
      
    }else{
      this.toastr.error('Preencha todos os campos do produto!', 'Atenção', {
        timeOut: 6000
      })
    }
  }
  /*
   *
   *Método responsável por salvar um kits no Objeto produto 
   *
  */
  async addKit(posicao) {
    if(this.kits[posicao].nome && this.kits[posicao].valor && this.kits[posicao].imgLink){
      this.produto.kits.push(this.kits[posicao])
      this.toastr.success('Kit Adicionado com Sucesso!', 'Pronto', {
        timeOut: 6000
      })
    }else{
      this.toastr.error('Preencha os campos corretamente!', 'Atenção', {
        timeOut: 6000
      })
    }
    
  }
  addFace(){
    if(this.corteH && this.corteV != undefined){
      let newSheet = [this.corteH, this.corteV]
      this.produto.cortes.push(newSheet)
      this.toastr.success('Folha Adicionado com Sucesso!', 'Pronto', {
        timeOut: 6000
      })
      this.corteH = undefined ,this.corteV = undefined
    }
  }
  /*
   *
   *Método responsável por buscar categorias cadastradas
   *
  */
  async getCategorias(){
    await this.service.getAll(CATEGORIAS).subscribe(
      res=>{ 
        this.categorias = res;
      }
    )
    await this.service.getAll(SUBCATEGORIAS).subscribe(
      res=>{ 
        this.Subcategorias = res;
        this.viewDOM = true
      }
    )
  }
  /*
   *
   *Método responsável por adicionar mais um form de kits no DOM 
   *
  */
  addFormKit(){
    this.kits.push({nome : '' , descricao : '', imgLink : '', imgId : '', preco : 0 }); 
  }
  /*
   *
   *Método responsável por Verificar se o produto é válido 
   *
  */
  productValidator(){
    if(this.produto.nome && this.produto.categoriaId){
      return true
    }
  }
 
  
}
