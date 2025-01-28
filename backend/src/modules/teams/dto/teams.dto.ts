import { IsString, IsArray, IsOptional } from 'class-validator';

export class CreateTeamDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @IsOptional()
  members?: string[]; // Array of user IDs
}

export class UpdateTeamDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @IsOptional()
  members?: string[]; // Array of user IDs
}

export class AddTeamMemberDto {
  @IsString()
  userId: string;
}

export class RemoveTeamMemberDto {
  @IsString()
  userId: string;
}
