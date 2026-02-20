import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { RegionModule } from './region/region.module';
import { ShopperModule } from './shopper/shopper.module';

@Module({
  imports: [AuthModule, PrismaModule, RegionModule, ShopperModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
