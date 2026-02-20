import { IsNotEmpty, IsString } from "class-validator";

export class CreateRegion {
    @IsNotEmpty()
    @IsString()
    name:    string

    @IsNotEmpty()
    @IsString()
    description:    string
}