import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { User } from './models/users.model';
import { AuthService } from 'src/auth/auth.service';
import { SignUpDto } from './dtos/signup.dto';
import { SignInDto } from './dtos/signin.dto';
import { match } from 'assert';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User')
    private readonly usersModel: Model<User>,
    private readonly authService: AuthService,
  ) {}

  public async signup(signupDto: SignUpDto): Promise<User> {
    const user = new this.usersModel(signupDto);
    return user.save();
  }
  public async signin(signinDto: SignInDto): Promise<{
    name: string;
    jwtToken: string;
    email: string;
  }> {
    const user = await this.usersModel.findOne({ email: signinDto.email });
    const macth = await this.checkPassword(signinDto.password, user);
    if (!macth) {
      throw new NotFoundException('Invalid credentials');
    }
    const jwtToken = await this.authService.createAccesToken(user._id);
    return { name: user.name, jwtToken, email: user.email };
  }
  private async checkPassword(password: string, user: User): Promise<boolean> {
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new NotFoundException('Password not found.');
    }
    return match;
  }
}
