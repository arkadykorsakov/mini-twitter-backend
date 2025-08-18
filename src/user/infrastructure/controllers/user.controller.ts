import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from '../../domain/services/user.service';
import { CreateUserDto } from '../../domain/dtos/create-user.dto';
import { UpdateUserDto } from '../../domain/dtos/update-user.dto';
import { UserSearchQueryDto } from '../../domain/dtos/user-search-query.dto';
import { UserModel } from '../../domain/models/user.model';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SearchResultDto } from 'base/domain/dtos/search-result.dto';
import { ApiOkSearchResponse } from 'base/infrastructure/decorators/ApiOkSearchResponse';

@ApiTags('Пользователи')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  @ApiOperation({ summary: 'Список пользователей' })
  @ApiOkSearchResponse({
    type: UserModel,
  })
  async getUsers(
    @Query() dto: UserSearchQueryDto,
  ): Promise<SearchResultDto<UserModel>> {
    return this.userService.getUsers(dto);
  }

  @Post('')
  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiCreatedResponse({
    type: UserModel,
  })
  createUser(@Body() dto: CreateUserDto): Promise<UserModel> {
    return this.userService.createUser(dto);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Получение пользователя по id' })
  @ApiParam({ type: 'number', name: 'id' })
  @ApiResponse({
    type: UserModel,
  })
  getUserById(@Param('id', ParseIntPipe) id: number): Promise<UserModel> {
    return this.userService.getUserById(id);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Обновление пользователя' })
  @ApiParam({ type: 'number', name: 'id' })
  @ApiResponse({
    type: UserModel,
  })
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserDto,
  ): Promise<UserModel> {
    return this.userService.updateUser(id, dto);
  }

  @Patch('/:id/archive')
  @ApiOperation({ summary: 'Удаление пользователя' })
  @ApiParam({ type: 'number', name: 'id' })
  @ApiResponse({
    type: UserModel,
  })
  archiveUserById(@Param('id', ParseIntPipe) id: number): Promise<UserModel> {
    return this.userService.archiveUser(id);
  }

  @Patch('/:id/restore')
  @ApiOperation({ summary: 'Восстановление пользователя' })
  @ApiParam({ type: 'number', name: 'id' })
  @ApiResponse({
    type: UserModel,
  })
  restoreUserById(@Param('id', ParseIntPipe) id: number): Promise<UserModel> {
    return this.userService.restoreUser(id);
  }
}
