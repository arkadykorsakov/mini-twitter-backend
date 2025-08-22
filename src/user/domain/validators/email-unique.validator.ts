import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../infrastructure/repositories/user.repository';

@ValidatorConstraint({ name: 'EmailUniqueValidator', async: true })
@Injectable()
export class EmailUniqueValidator implements ValidatorConstraintInterface {
  constructor(protected readonly userRepository: UserRepository) {}

  async validate(email: string) {
    if (!email) return true;
    const user = await this.userRepository.findByEmail(email);
    return !user;
  }

  defaultMessage(): string {
    return 'Пользователь с таким email уже существует';
  }
}
