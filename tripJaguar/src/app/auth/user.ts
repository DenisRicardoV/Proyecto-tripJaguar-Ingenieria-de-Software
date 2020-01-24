export interface Viajero{
    nombre: string,
    apellidos: string,
    pais: string,
    email:string,
    password:string,
    accept:boolean
};

export interface Representante{
    document: number,
    name: string,
    lastname: string,
    email:string,
    password:string
};

export interface Empresa{
    name: string,
    businessName: string,
    ruc: number,
    email: string,
    phone: number,
    web: string,
    address: string,
    region: string,
    logo: File,
    accept:boolean
};
export class Login{
    email: string;
    password: string;
}


