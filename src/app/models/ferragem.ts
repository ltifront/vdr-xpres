import { GenericService } from "../services/generic.service";

export class Ferragem{
    ref : number;
    perfil : string;
    peso : number
   
    
    constructor(private service : GenericService){
        this.ref = this.service.generateRef()
    }

}