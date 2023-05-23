import { Request, Response } from "express";
import { GetAllRolesService } from "../services/GetAllRolesService";

export class GetAllRolesController {
  async handle(request: Request, response: Response) {
    const getAllRolesService = new GetAllRolesService();

    const roles = await getAllRolesService.execute();
      
    return response.json(roles);
  }
}
