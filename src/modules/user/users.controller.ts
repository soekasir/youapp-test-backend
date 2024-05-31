import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { CreateUserDto, LoginDto, UpdateProfileDto } from './dto/user.dto';
import { UsersService } from './users.service';
import { useResponse } from './../../helpers/hooks';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';

@Controller('api')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('register')
  @ApiTags('auth')
  async register(@Body() createUserDto: CreateUserDto) {
    console.log('register', createUserDto);
    try {
      const user = await this.usersService.registerUser(createUserDto);
      await this.usersService.registerProfile(user._id);
      return useResponse(true, 'register berhasil');
    } catch (error) {
      console.error(error);
      throw new BadRequestException(
        useResponse(false, 'register gagal'),
        'register gagal',
      );
    }
  }

  @Post('login')
  @ApiTags('auth')
  async login(@Body() loginDto: LoginDto) {
    console.log('login', loginDto);
    const dataLogin = await this.usersService.login(loginDto);
    return useResponse(true, 'berhasil login', dataLogin);
  }

  @Post('createProfile')
  @ApiTags('profile')
  async createProfile(
    @Req() req: Request,
    @Body() createProfileDto: UpdateProfileDto,
  ) {
    try {
      console.log('createProfile', createProfileDto);
      await this.usersService.updateProfile(req['user']._id, createProfileDto);
      const profile = await this.usersService.getProfile(req['user']._id);
      return useResponse(true, 'berhasil membuat profile', profile);
    } catch (error) {
      console.error(error);
      throw new BadRequestException(
        useResponse(false, 'gagal membuat profile'),
        'gagal membuat profile',
      );
    }
  }

  @Put('updateProfile')
  @ApiTags('profile')
  async updateProfile(
    @Req() req: Request,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    try {
      console.log('updateProfile', updateProfileDto);
      await this.usersService.updateProfile(req['user']._id, updateProfileDto);
      const profile = await this.usersService.getProfile(req['user']._id);
      return useResponse(true, 'berhasil mengupdate profile', profile);
    } catch (error) {
      console.error(error);
      throw new BadRequestException(
        useResponse(false, 'gagal mengupdate profile'),
        'gagal mengupdate profile',
      );
    }
  }

  @Get('getProfile')
  @ApiTags('profile')
  async getProfile(@Req() req: Request) {
    try {
      console.log('getProfile', req['user']._id);
      const profile = await this.usersService.getProfile(req['user']._id);
      return useResponse(true, 'berhasil mengambil data profile', profile);
    } catch (error) {
      console.error(error);
      throw new BadRequestException(
        useResponse(false, 'gagal mengambil data profile'),
        'gagal mengambil data profile',
      );
    }
  }
}
