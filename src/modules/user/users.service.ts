import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from './../../schemas/User.schema';
import { CreateUserDto, LoginDto, UpdateProfileDto } from './dto/user.dto';
import { Profile } from './../../schemas/Profile.schema';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { hash, verify } from 'argon2';
import { useResponse } from './../../helpers/hooks';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Profile.name) private profileModel: Model<Profile>,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async registerUser(createUserDto: CreateUserDto) {
    createUserDto.password = await hash(createUserDto.password);
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  async registerProfile(user_id: Types.ObjectId) {
    const newProfile = new this.profileModel({ user: user_id });
    return newProfile.save();
  }

  async getUser(email: string) {
    return await this.userModel.findOne({ email });
  }

  async getProfile(user_id: Types.ObjectId) {
    return await this.profileModel.findOne({ user: user_id });
  }

  async login(loginDto: LoginDto) {
    const user = await this.getUser(loginDto.email);
    if (!user) {
      throw new UnauthorizedException(
        useResponse(false, 'Email not registered'),
        'Email not registered',
      );
    }
    const isCorrectPassword = await verify(user.password, loginDto.password);

    if (!isCorrectPassword) {
      throw new UnauthorizedException(
        useResponse(false, 'Password incorrect'),
        'Password incorrect',
      );
    }

    const token = await this.createJwtToken(user.email);

    return {
      token,
    };
  }

  private async createJwtToken(email: string) {
    const payload = { email };
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '2 days',
      secret: this.config.get('JWT_SECRET'),
    });

    return token;
  }

  async updateProfile(user_id: string, updateProfileDto: UpdateProfileDto) {
    return await this.profileModel.updateOne(
      { user: user_id },
      updateProfileDto,
    );
  }
}
