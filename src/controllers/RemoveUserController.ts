import { Request, Response } from "express";
import { RemoveUserService } from "../services/RemoveUserService"; 

export class RemoveUserController {
  async handle(request: Request, response: Response) {
    const { userId } = request.params; 

    const removeUserService = new RemoveUserService();
    const result = await removeUserService.execute({ userId });
    
    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json(result);
  }
}
