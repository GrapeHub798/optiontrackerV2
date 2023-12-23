import { Module } from '@nestjs/common';

import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  exports: [AuthService],
  imports: [UserModule],
  providers: [AuthService],
})
export class AuthModule {}
