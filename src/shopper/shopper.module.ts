import { Module } from '@nestjs/common';
import { ShopperService } from './shopper.service';
import { ShopperController } from './shopper.controller';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ShopperService],
  controllers: [ShopperController]
})
export class ShopperModule {}
