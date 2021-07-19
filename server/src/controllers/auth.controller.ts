import { NextFunction, Request, Response } from 'express';

class AuthController {
  public async login(req: Request, res: Response, next: NextFunction) {}
}

export = new AuthController();
