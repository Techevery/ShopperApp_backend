import { PrismaService } from '@/prisma/prisma.service';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateShopper } from './dto/shopper';

@Injectable()
export class ShopperService {
  constructor(private prisma: PrismaService) {}

  async createShopper(body: CreateShopper) {
    const { name, email, regionId } = body;
    try {
      const shopper = await this.prisma.shopper.findUnique({
        where: { email },
      });
      if (shopper) throw new UnauthorizedException('Accoun already exist!');
      const data = await this.prisma.shopper.create({
        data: { name, email, regionId },
      });
      return data
    } catch (error) {
        throw new HttpException(`${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getShoppers(){
    try {
        return await this.prisma.shopper.findMany()
    } catch (error) {
        throw new HttpException(`${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
