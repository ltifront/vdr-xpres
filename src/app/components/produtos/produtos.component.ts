import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GenericService } from '../../services/generic.service';
import { Observable } from 'rxjs/Observable';
import { isJsObject } from '@angular/core/src/change_detection/change_detection_util';
import { PRODUTOS } from '../../ENDPOINTS';
import { StorageService } from '../../services/storage.service';
import { Produto } from '../../models/produto';


@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  
  tempEdit: Produto = new Produto();
  viewDOM: boolean;
  produtos : Array<any> = new Array<any>();

  keep : boolean
  message : string

 
  
  constructor(private service : GenericService, private storage : StorageService) {
    this.getAllProdutos()
   
  }

  ngOnInit() {
  
  }

  getAllProdutos(){
    this.service.getAll(PRODUTOS).subscribe(
      res=>{
        this.produtos = res
        this.viewDOM = true
      }
    )
  }


  deleteProduto(produto){
    console.log(produto)
    this.storage.deleteImg(produto.imgId)
    this.service.delete(PRODUTOS, produto.key).then(
      res=>{
        this.message = 'Produto Excluído com sucesso!'
        console.log(this.message)
      }
      ,(err)=>{
        console.error(err)
        this.message = 'Erro ao tentar excluir!'
      }
    )
  }

  setEdit(produto){
    this.keep = true
    console.log(produto)
    this.tempEdit = produto;
  }

  condKeep(){
    this.keep = false
  }



  



}