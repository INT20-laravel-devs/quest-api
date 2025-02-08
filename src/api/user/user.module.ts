import { UserService } from './user.service';
import { FileModule } from '../../file/file.module';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { FastifyMulterModule } from '@nest-lab/fastify-multer';

@Module({
  providers: [UserService],
  imports: [FileModule, FastifyMulterModule],
  controllers: [UserController],
})
export class UserModule {}
