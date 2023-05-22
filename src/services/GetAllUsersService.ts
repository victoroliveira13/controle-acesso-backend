import { UserRepository } from "../repositories";

type UserReturned = {
  userId: String;
  username: String;
}

export class GetAllUsersService {
  async execute(): Promise<UserReturned[]> {
    const users = await UserRepository().find();

    const simplifiedUsers = users.map((user) => ({
      userId: user.id,
      username: user.username
    }));
    
    return simplifiedUsers;
  }
}
