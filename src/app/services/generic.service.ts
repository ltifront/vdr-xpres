import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { COMPRAS } from '../ENDPOINTS';

@Injectable()
export class GenericService {

  
  qnt_pedidos : any = 0
  dafault_number : number = 999999
  
  constructor(private firebase: AngularFireDatabase) {

    this.getQnt(COMPRAS)
  }

  getAll(endpoint) {
    return this.firebase.list(endpoint).snapshotChanges()
      .map(element => {
        return element.map(objeto => ({ key: objeto.payload.key, ...objeto.payload.val() }))
      })
  }

  getById(endpoint, id) {
    return this.firebase.object(`${endpoint}/${id}`).snapshotChanges()
      .map(objeto => { return { key: objeto.key, ...objeto.payload.val() } })
  }

  post(endpoint, objeto) {
    return this.firebase.list(endpoint).push(JSON.parse(JSON.stringify(objeto)))
    
  }

  put(endpoint, objeto) {
    return new Promise((resolve, reject) => {
      this.firebase.list(endpoint).set(objeto.key, objeto)
        .then(() => resolve())
        .catch((err) => reject(err))
    })
  }
  delete(endpoint, id) {
    return this.firebase.list(endpoint).remove(id);
  }


  getQnt(endpoint){
    this.getAll(endpoint).subscribe(
      res=>{
        this.qnt_pedidos = res.length
      }
    )
  }

  generateRef(){
    if(this.dafault_number % 2 === 0){ this.dafault_number * 2}
    else{this.dafault_number / 3}
    return Math.floor(Math.random() * (this.dafault_number - 0) + this.dafault_number)
  }

}
