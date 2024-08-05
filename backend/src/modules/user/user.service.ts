import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas';
import { isValidEmail } from 'src/common/utils/email-validator';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findUserByEmail(email: string): Promise<UserDocument | null> {
    if (!isValidEmail(email)) {
      throw new Error('invalid_email_format');
    }
    const user = await this.userModel.findOne({ email }).exec();
    return user;
  }
}
