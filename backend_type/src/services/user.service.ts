import { IUserBase } from "../models/user.model";

export class UserService {
  removePassword(user: any): IUserBase {
    const responseUser: IUserBase = {
      _id: user._id,
      name: user.name,
      email: user.email,
    };
    return responseUser;
  }

  removePasswordArray(userArray: any[]) {
    let userResponseArray: IUserBase[] = [];
    userArray.forEach((usr) => {
      userResponseArray.push({
        _id: usr._id,
        name: usr.name,
        email: usr.email,
      });
    });
    return userResponseArray;
  }
}
