import { Component, OnInit } from '@angular/core';
import { GenericService } from '../../services/generic.service';
import { USUARIOS } from '../../ENDPOINTS';
import { User } from '../../models/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  MASCARA_PERCENT = { align: "left", decimal: "", prefix: "", suffix: "%", thousands: ".", precision: 0,} 

  
  usuarios : Array<any> = new Array<any>()
  userTemp : any
  modalView : boolean
  
  constructor(private service : GenericService, public toastr: ToastrService) {
    
    this.getUsers()
  }

  getUsers(){
    this.service.getAll(USUARIOS).subscribe(
      res=>{
        this.usuarios = res;
        console.log(res)
      }
    )
  }

  setUser(usuario){
    this.userTemp = usuario
  }

  async deleteUser(user){
    await this.service.delete(USUARIOS, user.key)
    this.getUsers()
  }

  detailUser(user){
    this.userTemp = user;
    this.modalView = true;
  }

  async updateUser(user){
    this.toastr.success('Desconto Atualizado com Sucesso!', 'Pronto',{
      timeOut: 6000
    })
    await this.service.put(USUARIOS, user)
    this.getUsers()
    
  }

  ngOnInit() {
  }

}
