import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { VALIDATION_MESSAGES } from '../../../base/constants/validationMessages';

@ValidatorConstraint({ name: 'NicknameUniqueValidator', async: true })
@Injectable()
export class NicknameUniqueValidator implements ValidatorConstraintInterface {
  constructor(private readonly userRepository: UserRepository) {}

  async validate(
    nickname: string,
    args: ValidationArguments,
  ): Promise<boolean> {
    // Skip validation if nickname is empty (let other validators handle required validation)
    if (!nickname?.trim()) {
      return true;
    }

    try {
      // For now, we'll check without excluding current user
      // This can be enhanced later with proper request context integration
      const existingUser = await this.userRepository.findByNickname(nickname.trim());
      
      return !existingUser;
    } catch (error) {
      // Log error for debugging but don't fail validation due to technical issues
      console.error('Error during nickname uniqueness validation:', error);
      // In case of database errors, allow validation to pass to avoid blocking user operations
      return true;
    }
  }

  defaultMessage(args: ValidationArguments): string {
    return VALIDATION_MESSAGES.NICKNAME_ALREADY_EXISTS || 
           'Пользователь с таким никнеймом уже существует';
  }
}
