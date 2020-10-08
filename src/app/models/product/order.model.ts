export class Order {

    constructor(
        public id?:string,
        public nombre?: string,
        public modelo?: string,
        public marca?: string,
        public idproducto?: string,
        public precio?: number,
        public quantity?: number,
    )
    { }
  }