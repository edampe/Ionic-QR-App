
export class ScanData{

    info: string
    tipo: string

    constructor(texto: string){

        this.tipo = "no definido"

        if( texto.startsWith('http')){
            this.tipo = 'http'
            this.info = texto
        }else if( texto.startsWith('geo')){
            this.tipo = 'mapa'
            this.info = texto
        }else if( texto.startsWith('BEGIN:VCARD')){
            this.tipo = 'contacto'
            this.info = texto
        }else if( texto.startsWith('MATMSG')){
            this.tipo = 'email'
            this.info = texto
        }

    }


}