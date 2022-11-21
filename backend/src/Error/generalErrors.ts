import { CustomError } from "./customError";

export class MissingCredentials extends CustomError {
    constructor() {
      super(422, "All fields must be filled");
    }
  }
  
  export class Unauthorized extends CustomError {
    constructor() {
      super(401, "Unauthorized user.");
    }
  }