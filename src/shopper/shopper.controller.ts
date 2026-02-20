import { Controller, Post, Body, Req, Get } from '@nestjs/common';
import { ShopperService } from './shopper.service';
import { CreateShopper } from './dto/shopper';

@Controller('shopper')
export class ShopperController {
    constructor(private shopperService: ShopperService){}

    @Post('create')
    async createShopper(@Body() body: CreateShopper){
        return this.shopperService.createShopper(body)
    }
} 