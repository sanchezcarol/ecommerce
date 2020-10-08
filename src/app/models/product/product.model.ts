export class Producto {

  constructor(
      public _id?:string,
      public nombre?: string,
      public modelo?: string,
      public marca?: string,
      public descripcion?: string,
      public precio?: number,
      public stock?: number,
  )
  { }
}

