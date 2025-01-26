import { 
    Controller, 
    Post, 
    Get, 
    Put, 
    Delete, 
    Body, 
    Param, 
    UseGuards, 
    Request 
  } from '@nestjs/common';
  import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';
  
  @Controller('users')
  @UseGuards(JwtAuthGuard)
  export class UsersController {
    constructor(private usersService: UsersService) {}
  
    @Get()
    async getAllUsers() {
      return this.usersService.getAllUsers();
    }

  }