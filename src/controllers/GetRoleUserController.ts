import { Request, Response } from "express";
import { GetRoleUserService } from "../services/GetRoleUserService";

export class GetRoleUserController {
  async handle(request: Request, response: Response) {
    const { userId: id } = request.params; 

    const getRoleUserService = new GetRoleUserService();
    const result = await getRoleUserService.execute({ id });

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json(result);
  }
}
