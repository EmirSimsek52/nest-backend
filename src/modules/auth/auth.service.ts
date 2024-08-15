import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    if (user && await bcrypt.compare(pass, user.password)) {
      //@ts-ignore
      const { password, ...result } = user?.toObject();
      return result;
    }
    throw new UnauthorizedException('Invalid username or password');
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user._id, companyName: user.companyName };
    return {
      access_token: this.jwtService.sign(payload),
      companyName: user.companyName,
    };
  }

  async register(createUserDto: CreateUserDto) {
    const existingUserByUsername = await this.usersService.findOneByUsername(createUserDto.username);
    const existingUserByEmail = await this.usersService.findOneByEmail(createUserDto.email);
    
    if (existingUserByUsername) {
      throw new ConflictException('Username is already taken');
    }
    
    if (existingUserByEmail) {
      throw new ConflictException('Email is already taken');
    }
    
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    return this.usersService.create({
      ...createUserDto,
      password: hashedPassword,
    });
  }
}
