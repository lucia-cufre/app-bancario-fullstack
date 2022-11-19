import { Unauthorized } from "./../Error/generalErrors";
import { tokenGenerator } from "./../Services/instances";
import { Request, Response, NextFunction } from "express";
import { AuthenticationData } from "../Services/tokenGenerator";

function authenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authentication: string = request.headers.authorization as string;

  const accessToken: AuthenticationData =
    tokenGenerator.tokenData(authentication);

  if (accessToken === null)
    return response.status(400).json({ message: "invalid token" });

  return next();
}

export { authenticated };
