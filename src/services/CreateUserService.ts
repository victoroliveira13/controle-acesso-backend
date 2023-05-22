import { hash } from "bcryptjs";
import { getRepository } from "typeorm";
import { User } from "../entities/User";
import { UserRepository } from "../repositories";

type UserRequest = {
  username: string;
  password: string;
};

/* Criar User
Pre-condicao: nao ha;
Pos-condicao: novo user
Descricao: recebe os argumentos (username, password):UserRequest, cria um novo
user e o retorne.
*/
export class CreateUserService {
  async execute({ password, username }: UserRequest): Promise<Error | User> {
    const existUser = await UserRepository().findOne({ username });

    if (existUser) {
      return new Error("User already exists");
    }

    const passwordHash = await hash(password, 8);

    const user = UserRepository().create({ username, password: passwordHash });

    await UserRepository().save(user);

    return user;
  }
}
