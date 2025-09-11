import { CommentService } from '../../domain/services/CommentService';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../../auth/infrastructure/guards/jwt-auth.guard';
import { CurrentUser } from '../../../user/infrastructure/decorators/current-user.decorator';
import { UserModel } from '../../../user/domain/models/user.model';
import { UpdateCommentDto } from '../../domain/dtos/update-comment.dto';

@ApiTags('Комментарии')
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Put('/:id')
  @ApiOperation({ summary: 'Обновить комментарий' })
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Обновлен комментарий' })
  updateComment(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: UserModel,
    @Body() dto: UpdateCommentDto,
  ) {
    return this.commentService.updateComment(user.id, id, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  @ApiOperation({ summary: 'Удалить комментарий' })
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 204, description: 'Удален комментарий' })
  deleteComment(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: UserModel,
  ) {
    return this.commentService.deleteComment(user.id, id);
  }
}
