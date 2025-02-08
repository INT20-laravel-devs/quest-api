import { UserService } from './user.service';
import { FileModule } from '../../file/file.module';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';

@Module({
  providers: [UserService],
  imports: [FileModule],
  controllers: [UserController],
})
export class UserModule {}
