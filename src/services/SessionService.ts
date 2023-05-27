import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { UserRepository } from "../repositories";
import { Role } from "../entities/Role";
import { Permission } from "../entities/Permission";

type UserRequest = {
  username: string;
  password: string;
};

type ACLUserResponse = {
  name: string;
  description: string;
}


export class SessionService {
  async execute({ username, password }: UserRequest) {
    const repo = UserRepository();

    const user = await repo.findOne({ username });

    if (!user) {
      return new Error("User does not exists!");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      return new Error("User or Password incorrect");
    }

    const token = sign({}, process.env.SECRET_JWT, {
      subject: user.id,
    });

    const acl = await repo.findOne(user.id, { relations: ["roles", "permissions"] });

    const roles: ACLUserResponse[] = acl.roles.map((role: Role) => ({
      name: role.name,
      description: role.description,
    }));

    const permissions: ACLUserResponse[] = acl.permissions.map((permission: Permission) => ({
      name: permission.name,
      description: permission.description,
    }));

    return { token, user: { 
      id: user.id,
      username: user.username,
      roles: roles,
      permissions: permissions,
    } };
  }
}
