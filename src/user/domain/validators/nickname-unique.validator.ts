import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { VALIDATION_MESSAGES } from 'base/constants/validationMessages';

@ValidatorConstraint({ name: 'NicknameUniqueValidator', async: true })
@Injectable()
export class NicknameUniqueValidator implements ValidatorConstraintInterface {
  constructor(private readonly userRepository: UserRepository) {}

  async validate(nickname: string): Promise<boolean> {
    if (!nickname?.trim()) {
      return true;
    }

    try {
      const existingUser = await this.userRepository.findByNickname(
        nickname.trim(),
      );

      return !existingUser;
    } catch {
      return true;
    }
  }

  defaultMessage(): string {
    return VALIDATION_MESSAGES.NICKNAME_ALREADY_EXISTS;
  }
}
