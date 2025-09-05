import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PostSearchQueryDto } from '../../domain/dtos/post-search-query.dto';
import { ApiOkSearchResponse } from '../../../base/infrastructure/decorators/ApiOkSearchResponse';
import { PostModel } from '../../domain/models/post.model';
import { PostService } from '../../domain/services/post.service';
import { PostDto } from '../../domain/dtos/post.dto';
import { JwtAuthGuard } from '../../../auth/infrastructure/guards/jwt-auth.guard';
import { CurrentUser } from '../../../user/infrastructure/decorators/current-user.decorator';
import { UserModel } from '../../../user/domain/models/user.model';

@ApiTags('Посты')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('')
  @ApiOperation({ summary: 'Список постов' })
  @ApiOkSearchResponse({
    type: PostModel,
  })
  @UseGuards(JwtAuthGuard)
  getPosts(@Query() dto: PostSearchQueryDto) {
    return this.postService.getPosts(dto);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Получение пользователя по id' })
  @ApiParam({ type: 'number', name: 'id' })
  @ApiResponse({
    type: PostModel,
  })
  @UseGuards(JwtAuthGuard)
  getPostById(@Param('id', ParseIntPipe) id: number) {
    return this.postService.getPostById(id);
  }

  @Post('')
  @ApiOperation({ summary: 'Создание поста' })
  @ApiCreatedResponse({
    type: PostModel,
  })
  @UseGuards(JwtAuthGuard)
  @Post('')
  createPost(@CurrentUser() user: UserModel, @Body() dto: PostDto) {
    return this.postService.createPost(user, dto);
  }

  @ApiOperation({ summary: 'Обновление поста' })
  @ApiParam({ type: 'number', name: 'id' })
  @ApiResponse({
    type: PostModel,
  })
  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  updatePost(
    @CurrentUser() user: UserModel,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: PostDto,
  ) {
    return this.postService.updatePost(user, id, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  @ApiOperation({ summary: 'Удалить пост' })
  @ApiResponse({ status: 204, description: 'Пост удален' })
  @UseGuards(JwtAuthGuard)
  deletePost(
    @CurrentUser() user: UserModel,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.postService.deletePost(user, id);
  }
}
