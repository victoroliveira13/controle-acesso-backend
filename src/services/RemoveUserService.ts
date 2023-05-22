import { User } from "../entities/User";
import {  UserRepository } from "../repositories";

type UserRequest = {
  userId: string;
  username: string;
}

export class RemoveUserService {
  async execute({ userId }): Promise<UserRequest | Error> {
    const repo = UserRepository();

    const user = await repo.findOne(userId);

    if (!user) {
      return new Error("User does not exists!");
    }

    await UserRepository().remove(user);

    const simplifiedUser: UserRequest = {
      userId: user.id,
      username: user.username
    };

    return simplifiedUser;
  }
}
