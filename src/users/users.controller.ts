import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { SignUpDto } from './dtos/signup.dto';
import { User } from './models/users.model';
import { SignInDto } from './dtos/signin.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  public async signup(@Body() signup: SignUpDto): Promise<User> {
    return this.usersService.signup(signup);
  }
  @Post('signin')
  @HttpCode(HttpStatus.CREATED)
  public async signin(
    @Body() signinDto: SignInDto,
  ): Promise<{ name: string; jwtToken: string; email: string }> {
    return this.usersService.signin(signinDto);
  }

  // Progeter as rotas com jwt
  // @Get()
  // @UseGuards(AuthGuard('jwt'))
  // public async findAll() {
  //   return 'Todos';
  // }
}
