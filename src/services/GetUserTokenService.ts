import { UserRepository } from "../repositories";
import * as jwt from 'jsonwebtoken';

type UserReturned = {
  id: String;
  username: string;
}

/* Busca usuário relacionado ao token
Pre-condicao: nao ha;
Pos-condicao: usuario autenticado (token gerado);
Descricao: Busca o id do usuário que criou o token
*/
export class GetUserTokenService {
  async execute({ token }): Promise<UserReturned> {
    const payload = jwt.decode(token);
    const repo = UserRepository();
    const user = await repo.findOne({ id: payload.sub.toString() });

    const { id, username } = user;

    return { id, username };
  }
}
