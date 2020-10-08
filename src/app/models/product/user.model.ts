export class User {

    constructor(
        public _id?:string,
        public first_name?: string,
        public last_name?: string,
        public password?: string,
        public username?: string,
        public email?: string,
        public is_staff?: boolean,
    )
    { }
  }
  
  