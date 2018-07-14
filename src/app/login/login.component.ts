import { Component, OnInit, DoCheck } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  usuario : User

  constructor(private authFire : AngularFireAuth, private route : Router) {
    this.usuario = new User();
  }
  
  ngOnInit() {
  }

  login(){
    this.authFire.auth.signInWithEmailAndPassword(this.usuario.email, this.usuario.senha).then( () =>{
        console.log(this.authFire.auth.currentUser)
        alert('Usuario Logado')
        this.route.navigate(['home'])
      }).catch(error =>{
        console.log(error)
        alert('Usuario ou senha incorreta!')
      })
  }
  




}
