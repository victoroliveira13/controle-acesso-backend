import { Request, Response } from "express";
import { RemoveRoleService } from "../services/RemoveRoleService"; 

export class RemoveRoleController {
  async handle(request: Request, response: Response) {
    const { roleId } = request.params; 

    const removeRoleService = new RemoveRoleService();
    const result = await removeRoleService.execute({ roleId });
    
    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json(result);
  }
}
