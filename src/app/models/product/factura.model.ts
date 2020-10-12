export class Factura {

    constructor(
        public id?:string,
        public fechaCompra?: string,
        public idProduct?: number,
        public idUserrAccount?: number,
        public CantidadDeUnidades?: number,
        public precioTotal?:any
    )
    { }
  }