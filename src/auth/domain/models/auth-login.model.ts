import { UserModel } from 'user/domain/models/user.model';
import { ApiProperty } from '@nestjs/swagger';

export class AuthLoginModel {
  @ApiProperty({
    description: 'Access Token',
  })
  accessToken: string;

  @ApiProperty({
    description: 'Пользователь',
  })
  user: UserModel;
}
