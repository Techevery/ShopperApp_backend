import { Controller, Post, Body, Req, Get } from '@nestjs/common';
import { ShopperService } from './shopper.service';

@Controller('shopper')
export class ShopperController {
    constructor(private shopperService: ShopperService){}

    @Post('create')
    async createShopper(@Body() body: any){
        try {
            
        } catch (error) {
            
        } 
    }
} 