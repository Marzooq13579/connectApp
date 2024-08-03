import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async register(user: RegisterUserDto) {
    if (await this.findUserByEmail(user.email)) {
      throw new ConflictException('User with this email already exists');
    }
    const createdUser = new this.userModel(user);
    const savedUser = await createdUser.save();
    const savedUserObject = savedUser.toObject();
    delete savedUserObject.password;
    return savedUserObject;
  }

  async findUserByEmail(email: string) {
    const query = this.userModel.where({ email });
    return await query.findOne();
  }
}
