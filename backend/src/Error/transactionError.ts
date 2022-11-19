import { CustomError } from "./customError";

export class OutOfCash extends CustomError{
    constructor(){
        super(400, "Insufficient balance.")
    }
  }