import { UserService } from './user.service';
import { FileModule } from '../../file/file.module';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [UserService],
  imports: [FileModule, AuthModule],
  controllers: [UserController],
})
export class UserModule {}
