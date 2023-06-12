import { Module } from '@nestjs/common';
import { ZapierService } from './zapier.service';
import { ZapierController } from './zapier.controller';
import { ZapierWebHook } from './zapier_webhook.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([ZapierWebHook]), HttpModule],
  providers: [ZapierService],
  controllers: [ZapierController],
})
export class ZapierModule {}
