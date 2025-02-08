import {
  Controller,
  Patch,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { FileInterceptor, File } from '@nest-lab/fastify-multer';
import { FastifyRequest } from 'fastify';
import { AuthGuard } from '../auth/guard/auth.guard';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch('/avatars/upload')
  @UseGuards(AuthGuard())
  @UseInterceptors(FileInterceptor('file'))
  uploadAvatar(@UploadedFile() file: File, @Req() req: FastifyRequest) {
    console.log(file);
    return this.userService.updateAvatar(file, req['user'].id);
  }
}
