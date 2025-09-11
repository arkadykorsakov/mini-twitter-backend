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
import { PostModel } from '../../domain/models/post.model';
import { PostService } from '../../domain/services/post.service';
import { PostDto } from '../../domain/dtos/post.dto';
import { JwtAuthGuard } from 'auth/infrastructure/guards/jwt-auth.guard';
import { CurrentUser } from 'user/infrastructure/decorators/current-user.decorator';
import { UserModel } from 'user/domain/models/user.model';
import { ApiOkSearchResponse } from 'base/infrastructure/decorators/ApiOkSearchResponse';
import { LikePostService } from '../../domain/services/like-post.service';
import { FeedPostService } from '../../domain/services/feed-post.service';
import { SearchWithQueryDto } from '../../../base/domain/dtos/search-with-query.dto';
import { CommentService } from '../../../comment/domain/services/CommentService';
import { CreateCommentDto } from '../../../comment/domain/dtos/create-comment.dto';

@ApiTags('Посты')
@Controller('posts')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly likePostService: LikePostService,
    private readonly feedPostService: FeedPostService,
    private readonly commentService: CommentService,
  ) {}

  @Get('')
  @ApiOperation({ summary: 'Список постов' })
  @ApiOkSearchResponse({
    type: PostModel,
  })
  @UseGuards(JwtAuthGuard)
  getPosts(@Query() dto: PostSearchQueryDto, @CurrentUser() user: UserModel) {
    return this.postService.getPosts(dto, user.id);
  }

  @ApiOperation({
    summary:
      'Лента постов пользователей, на которых подписан текущий пользователь',
    description:
      'Возвращает ленту публикаций от авторов, на которых подписан текущий пользователь',
  })
  @ApiResponse({
    status: 200,
    description: 'Успешное получение ленты постов',
  })
  @UseGuards(JwtAuthGuard)
  @Get('my-feed')
  getFeedPosts(
    @Query() dto: SearchWithQueryDto,
    @CurrentUser() user: UserModel,
  ) {
    const { page = 1, limit = 10 } = dto;
    return this.feedPostService.getFeedPosts(user.id, page, limit);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Получение пользователя по id' })
  @ApiParam({ type: 'number', name: 'id' })
  @ApiResponse({
    type: PostModel,
  })
  @UseGuards(JwtAuthGuard)
  getPostById(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: UserModel,
  ) {
    return this.postService.getPostById(id, user.id);
  }

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

  @ApiOperation({ summary: 'Поставить/убрать лайк' })
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Поставлен/убран лайк' })
  @Post(':id/like')
  toggleLike(
    @CurrentUser() user: UserModel,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.likePostService.toggleLikePost(id, user.id);
  }

  @ApiOperation({ summary: 'Добавить комментарий' })
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Добавлен комментарий' })
  @Post(':id/comment')
  async addComment(
    @CurrentUser() user: UserModel,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateCommentDto,
  ) {
    await this.commentService.createComment({
      ...dto,
      postId: id,
      userId: user.id,
    });

    return this.postService.getPostById(id, user.id);
  }
}
