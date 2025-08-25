import { Feed } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class FeedModel implements Feed {
  @ApiProperty({
    description: 'Id подписки',
  })
  id: number;
  @ApiProperty({
    description: 'Id пользователя, на которого подписываются',
  })
  followerId: number;
  @ApiProperty({
    description: 'Id подписчика',
  })
  followedId: number;
  @ApiProperty({
    description: 'Дата подписки',
  })
  createTime: Date;
}
