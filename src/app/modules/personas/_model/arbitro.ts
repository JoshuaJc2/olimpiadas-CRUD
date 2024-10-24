export class Arbitro{
    idArbitro : number = 0;
    nombre : String = "";
    primer_apellido : String = "";
    segundo_apellido : String = "";
    pais_origen : String = "";
    nacimiento : Date = new Date();   

    constructor(idArbitro : number, nombre : String, primer_apellido : String, segundo_apellido : String, pais_origen : String, nacimiento : Date){
        this.idArbitro = idArbitro;
        this.nombre = nombre;
        this.primer_apellido = primer_apellido;
        this.segundo_apellido = segundo_apellido;
        this.pais_origen = pais_origen;
        this.nacimiento = nacimiento; 
    }
}