import { ConflictException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './dto/register-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findUserByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const foundUser = user.toObject();
      delete foundUser.password;
      return foundUser;
    }
    return null;
  }

  async register(user: RegisterUserDto) {
    if (await this.usersService.findUserByEmail(user.email)) {
      throw new ConflictException('user_with_this_email_already_exists');
    }
    const createdUser = new this.userModel(user);
    const savedUser = await createdUser.save();
    const savedUserObject = savedUser.toObject();
    delete savedUserObject.password;
    return savedUserObject;
  }

  async login(user: any) {
    console.log('user login object is', user);
    console.log('user id is', user._id);
    const payload = { username: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
