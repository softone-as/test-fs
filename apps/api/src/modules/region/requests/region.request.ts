import { IsLatitude, IsLongitude, IsNotEmpty } from 'class-validator';

export class CheckLocationRequest {
    @IsNotEmpty()
    @IsLatitude()
    latitude: string;

    @IsNotEmpty()
    @IsLongitude()
    longitude: string;
}
