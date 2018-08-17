import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-database',
  templateUrl: './post-database.component.html',
  styleUrls: ['./post-database.component.css']
})


export class PostDatabaseComponent implements OnInit {

  
  readonly types = ['Ferragem', 'Vidro', 'Acessório']     
  newObject : Object
  
  constructor() {
    
  }

  ngOnInit() {
    this.newObject = new Object
  }

  saveObject(){

  }



  



}
