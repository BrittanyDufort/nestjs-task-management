import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRespository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return await this.userRespository.signUp(authCredentialsDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    const username = await this.userRespository.validateUserPassword(authCredentialsDto);

    if (!username) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { username };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
