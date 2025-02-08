import {
  Body,
  Controller,
  Param,
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
import { UserUpdateDto } from './dto/user-update.dto';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch('/avatars/upload')
  @UseGuards(AuthGuard())
  @UseInterceptors(FileInterceptor('file'))
  uploadAvatar(@UploadedFile() file: File, @Req() req: FastifyRequest) {
    return this.userService.updateAvatar(file, req['user'].id);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard())
  update(@Body() body: UserUpdateDto, @Param('id') id: string) {
    return this.userService.update(body, id);
  }
}
