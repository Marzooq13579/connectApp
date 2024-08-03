import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findUserByEmail(email);
    if (user && (await bcrypt.compare(user.password, pass))) {
      const foundUser = user;
      delete foundUser.password;
      return foundUser;
    }
    return null;
  }
}
