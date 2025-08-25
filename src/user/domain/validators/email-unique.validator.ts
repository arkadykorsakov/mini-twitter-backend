import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { VALIDATION_MESSAGES } from 'base/constants/validationMessages';

@ValidatorConstraint({ name: 'EmailUniqueValidator', async: true })
@Injectable()
export class EmailUniqueValidator implements ValidatorConstraintInterface {
  constructor(private readonly userRepository: UserRepository) {}

  async validate(email: string): Promise<boolean> {
    if (!email?.trim()) {
      return true;
    }

    try {
      const existingUser = await this.userRepository.findByEmail(
        email.trim().toLowerCase(),
      );

      return !existingUser;
    } catch {
      return true;
    }
  }

  defaultMessage(): string {
    return VALIDATION_MESSAGES.EMAIL_ALREADY_EXISTS;
  }
}
