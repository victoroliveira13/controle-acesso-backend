import { Request, Response } from "express";
import { GetACLUserService } from "../services/GetACLUserService";

export class GetACLUserController {
  async handle(request: Request, response: Response) {
    const { userId: id } = request.params; 

    const getACLUserService = new GetACLUserService();
    const result = await getACLUserService.execute({ id });

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json(result);
  }
}
