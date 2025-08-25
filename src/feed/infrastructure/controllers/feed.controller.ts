import { FeedService } from '../../domain/services/feed.service';
import {
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FeedModel } from '../../domain/models/feed.model';
import { CurrentUser } from '../../../user/infrastructure/decorators/current-user.decorator';
import { UserModel } from '../../../user/domain/models/user.model';
import { JwtAuthGuard } from '../../../auth/infrastructure/guards/jwt-auth.guard';

@ApiTags('Подписки')
@Controller('feeds')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Post(':followedId')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Подписаться на пользователя' })
  @ApiResponse({ type: FeedModel })
  async follow(
    @CurrentUser() user: UserModel,
    @Param('followedId', ParseIntPipe) followedId: number,
  ): Promise<FeedModel> {
    return this.feedService.follow(user.id, followedId);
  }

  @Delete(':followedId')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Отписаться от пользователя' })
  async unfollow(
    @CurrentUser() user: UserModel,
    @Param('followedId', ParseIntPipe) followedId: number,
  ): Promise<void> {
    await this.feedService.unfollow(user.id, followedId);
  }
}
