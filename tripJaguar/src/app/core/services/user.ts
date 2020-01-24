export interface Roles { 
    agency?: boolean;
    tourist?: boolean;
    admin?: boolean;
 }
  
export interface User {
    uid: string;
    dni?:Int32Array;
    nombre?:string;
    apellidos?:string;
    pais?:string;
    email: string;
    roles: Roles;
    accept?:boolean;
}