import axios from 'axios';
import { ApiUrlUtil } from '../../utils/apiUrlUtil';
import { UserRoleModel } from '../../model/UserRoleModel';
import { HeadersUtil } from '../../utils/headersUtil';

export class UserService {
  private static _userService: UserService;

  public static getInstance(): UserService {
    if (!UserService._userService) {
      UserService._userService = new UserService();
    }
    return UserService._userService;
  }
}
