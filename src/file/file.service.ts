import { Injectable } from '@nestjs/common';
import { File } from '@nest-lab/fastify-multer';
import * as fs from 'node:fs';
import { resolve, join } from 'path';
import { v4 } from 'uuid';
import { ConfigService } from '@nestjs/config';
import { URL } from 'url';

@Injectable()
export class FileService {
  constructor(private readonly configService: ConfigService) {}

  uploadFile(file: File): string {
    const fileName = `${v4()}.${file.originalname.split('.').pop()}`;
    const path = join(resolve(), '/static/', fileName);
    fs.writeFileSync(path, file.buffer);
    const baseUrl = this.configService.get<string>('BACK_BASE_URL');
    return new URL(fileName, baseUrl).toString();
  }
}
