import { Injectable } from '@nestjs/common';
import { File } from '@nest-lab/fastify-multer';
import { FileService } from '../../file/file.service';
import { UserRepo } from '../../database/repos/user.repo';
import { UserUpdateDto } from './dto/user-update.dto';
import * as bcrypt from 'bcrypt';
import { PasswordIsNotValidException } from '../../utils/exception/password-is-not-valid.exception';
import { Prisma } from '@prisma/client';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    private readonly fileService: FileService,
    private readonly userRepo: UserRepo,
    private readonly authService: AuthService,
  ) {}

  async updateAvatar(file: File, userId: string) {
    const link = this.fileService.uploadFile(file);
    const user = await this.userRepo.findById(userId);
    if (user.avatarLink) {
      this.fileService.deleteFile(user.avatarLink);
    }
    await this.userRepo.updateById(userId, { avatarLink: link });
    return { link };
  }

  async update(userUpdateDto: UserUpdateDto, userId: string) {
    const data: Prisma.UserUpdateInput = { nickname: userUpdateDto.nickname };
    if (userUpdateDto.newPassword && userUpdateDto.currentPassword) {
      const user = await this.userRepo.findById(userId);
      const isPasswordValid = await bcrypt.compare(
        userUpdateDto.currentPassword,
        user.password,
      );
      if (!isPasswordValid) {
        throw new PasswordIsNotValidException();
      }
      data.password = await this.authService.hashPassword(
        userUpdateDto.newPassword,
      );
    }
    const user = await this.userRepo.updateById(userId, data);
    delete user.password;
    return user;
  }
}
