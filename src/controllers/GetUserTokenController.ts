import { Request, Response } from "express";
import { GetUserTokenService } from "../services/GetUserTokenService";

export class GetUserTokenController {
  async handle(request: Request, response: Response) {
    const { token } = request.params; 

    const getUserTokenService = new GetUserTokenService();
    const result = await getUserTokenService.execute({ token });

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json(result);
  }
}
