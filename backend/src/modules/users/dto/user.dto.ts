import { IsString, IsEnum, IsOptional, IsDate, IsNumber } from 'class-validator';

//Fetch all users
export class FetchUsersDto {
  @IsOptional()
  @IsString()
  name?: string;
}