import { Controller } from '@nestjs/common';
import { RegionService } from './region.service';
import { CreateRegion } from './dto/region';

@Controller('region')
export class RegionController {
    constructor (private regionService: RegionService){}

}
