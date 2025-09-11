import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { CommentRepository } from '../../infrastructure/repositories/CommentRepository';

@ValidatorConstraint({ name: 'ExistCommentValidator', async: true })
@Injectable()
export class ExistCommentValidator implements ValidatorConstraintInterface {
  constructor(private readonly commentRepository: CommentRepository) {}

  async validate(parentCommentId: number): Promise<boolean> {
    const comment = await this.commentRepository.getById(parentCommentId);
    return !!comment;
  }

  defaultMessage(): string {
    return 'Родительский комментарий не найден';
  }
}
