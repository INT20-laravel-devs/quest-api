import { Injectable } from '@nestjs/common';
import { File } from '@nest-lab/fastify-multer';
import { FileService } from '../../file/file.service';

@Injectable()
export class UserService {
  constructor(private readonly fileService: FileService) {}

  updateAvatar(file: File, userId: string) {
    const link = this.fileService.uploadFile(file);
    return { link };
  }
}
