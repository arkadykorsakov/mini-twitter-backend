import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { UserModel } from '../../domain/models/user.model';

export const CurrentUserDecorator = createParamDecorator(
  (data: keyof UserModel | undefined, ctx: ExecutionContext) => {
    const request = ctx
      .switchToHttp()
      .getRequest<Request & { user?: UserModel }>();

    const user = request.user;
    if (!user) {
      return null;
    }

    return data ? user[data] : user;
  },
);
