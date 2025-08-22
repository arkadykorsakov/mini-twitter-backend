import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../infrastructure/repositories/user.repository';

@ValidatorConstraint({ name: 'NicknameUniqueValidator', async: true })
@Injectable()
export class NicknameUniqueValidator implements ValidatorConstraintInterface {
  constructor(protected readonly userRepository: UserRepository) {}

  async validate(nickname: string) {
    if (!nickname) return true;
    const user = await this.userRepository.findByNickname(nickname);
    return !user;
  }

  defaultMessage(): string {
    return 'Пользователь с таким никнеймом уже существует';
  }
}
