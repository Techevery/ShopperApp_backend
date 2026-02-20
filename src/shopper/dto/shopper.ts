import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateShopper {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsString()
    regionId: string
}