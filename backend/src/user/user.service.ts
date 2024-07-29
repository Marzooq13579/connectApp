import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async register(user: RegisterUserDto) {
    const createdUser = new this.userModel(user);
    return await createdUser.save();
  }
}
