import { Request, Response } from "express";
import { GetAllACLUserService } from "../services/GetAllACLUserService";

export class GetAllACLUserController {
  async handle(request: Request, response: Response) {

    const getAllACLUserService = new GetAllACLUserService();
    const result = await getAllACLUserService.execute();

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json(result);
  }
}
