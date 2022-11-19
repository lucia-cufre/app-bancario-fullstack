import { HashManager } from "./hashManager";
import { IdGenerator } from "./idGenerator";
import { Authenticator } from "./tokenGenerator";
import { Functions } from "./functions";

export const idGenerator = new IdGenerator();
export const hashManager = new HashManager();
export const tokenGenerator = new Authenticator();
export const functions = new Functions();
