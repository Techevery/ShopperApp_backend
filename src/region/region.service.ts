import { PrismaService } from '@/prisma/prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRegion } from './dto/region';

@Injectable()
export class RegionService {
  constructor(private prisma: PrismaService) {}

  async createRegion(body: CreateRegion) {
    const { name, description } = body;
    try {
      const region = await this.prisma.region.create({
        data: { name, description },
      });
      return region
    } catch (error) {
        throw new HttpException(`${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getRegion(){
    try {
        return this.prisma.region.findMany()
    } catch (error) {  
       throw new HttpException(`${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR) 
    }
  }
}
