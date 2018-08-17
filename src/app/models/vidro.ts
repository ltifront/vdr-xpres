import { GenericService } from "../services/generic.service";

export class Ferragem{
    ref : number;
    perfil : string;
    valorm2 : number
   
    
    constructor(private service : GenericService){
        this.ref = this.service.generateRef()
    }

}