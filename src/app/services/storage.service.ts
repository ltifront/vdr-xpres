import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList,  } from 'angularfire2/database';
import * as firebase from 'firebase'
import { AngularFireStorage } from 'angularfire2/storage';
import { FileUpload } from '../models/FileUpload';
import { Observable } from '@firebase/util';

const ENDPOINT : string  = 'imagens/'

@Injectable()
export class StorageService {

  progressBarValue

  constructor(private storage : AngularFireStorage) { }


  async upload(file) {
    let info : any = { link : '' , id : '' }
    let uniqkey = 'imagem' + Math.floor(Math.random() * 1000000);
    const uploadTask = this.storage.upload('imagens/' + uniqkey, file);
    uploadTask.percentageChanges().subscribe((value) => {
      this.progressBarValue = value.toFixed(2);
    })
    console.log(uploadTask)
    info.link = uploadTask.downloadURL()
    
    info.id = uniqkey;
    return info;
  }


  deleteImg(imgId){
    this.storage.ref(`imagens/${imgId}`).delete()
  }
}
