import { GenericService } from "../services/generic.service";

export class Ferragem{
    ref : number;
    perfil : string;
    valor_unid : number
   
    
    constructor(private service : GenericService){
        this.ref = this.service.generateRef()
    }

}