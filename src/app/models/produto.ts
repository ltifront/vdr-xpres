import { Kit } from "./kit";


export class Produto {
    
    categoriaId: string;
    categoriaNome: string;
    subcategoriaId: string;
    subcategoriaNome: string;
    nome: string;
    descricao: string;
    cor: string;
    medida: number;
    imgId: string;
    imgLink: string;
    furacao: string;
    kits: Array<Kit>;
    preco: number;

    altura: number;
    largura: number;
    largura_fixo: number;
    largura_porta: number;
    altura_porta : number;

    cortes : Array<Array<any>>;
    folhas : Array<Array<any>>;
    
    fixo : boolean
    porta : boolean
    corte_v : boolean


    

    

}