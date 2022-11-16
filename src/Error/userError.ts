import { CustomError } from "./customError"

export class InvalidCredentials extends CustomError{
    constructor(){
        super(422, "Password invalid.")
    }
}

export class InvalidPassword extends CustomError{
  constructor(){
      super(422, "The password must contain a minimum of 8 characters, a number and a capital letter.")
  }
}


export class InvalidUsername extends CustomError{
    constructor(){
        super(422, "The username must contain a minimum of 3 characters.")
    }
}

export class UserNotFound extends CustomError{
    constructor(){
        super(404, "Usuário não encontrado")
    }
  }

  export class UsernameExists extends CustomError {
    constructor() {
      super(400, "Already exists an user with that username, it has to be unique.");
    }
  }