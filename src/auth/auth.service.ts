import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HashService } from 'src/user/hash.service';
import { RegisterUserDto } from './register-user.dto';
import { User, UserDocument } from '../user/user.schema';
import { LoginUserDto } from './login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private hashService: HashService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userModel.findOne({ username: email }).exec();
    if (user && (await this.hashService.comparePassword(pass, user.password))) {
      return user;
    }
    return null;
  }

  async login(user: LoginUserDto) {
    const payload = {
      username: user.username,
      sub: user.password,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async getUserByUsername(username: string) {
    return this.userModel
      .findOne({
        username,
      })
      .exec();
  }

  async registerUser(createUserDto: RegisterUserDto) {
    // validate DTO

    const createUser = new this.userModel(createUserDto);
    // check if user exists
    const user = await this.getUserByUsername(createUser.username);
    if (user) {
      return {
        message: 'User already registered',
      };
    }
    // Hash Password
    createUser.password = await this.hashService.hashPassword(
      createUser.password,
    );
    createUser.save();

    return {
      message:
        'User registered successfully, please login to access your account.',
    };
  }
}
