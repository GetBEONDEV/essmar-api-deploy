import { ParseIntPipe } from 'src/common/parse-int/parse-int.pipe';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
  // ParseIntPipe,
} from '@nestjs/common';
import { UserService } from 'src/users/services/user.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UpdateUserDto, CreateUserDto } from 'src/users/dtos/user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Obtener lista de Customers.' })
  @Get('all')
  getAll() {
    return this.userService.findAll();
  }

  @Get(':userId')
  @HttpCode(HttpStatus.ACCEPTED)
  getUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.findOne(userId);
  }

  @Post('user')
  createUser(@Body() body: CreateUserDto): any {
    console.log(body);
    return this.userService.create(body);
  }

  @Put('user/update/:userId')
  updateUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() body: UpdateUserDto,
  ): any {
    return this.userService.update(userId, body);
  }

  @Delete('user/:userId')
  deleteUser(@Param('userId', ParseIntPipe) userId: number): any {
    return this.userService.remove(userId);
  }
}
