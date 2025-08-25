import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { FileRepository } from 'file/infrastructure/repositories/FileRepository';

@ValidatorConstraint({ name: 'ExistAvatarIdValidator', async: true })
@Injectable()
export class ExistAvatarIdValidator implements ValidatorConstraintInterface {
  constructor(protected readonly fileRepository: FileRepository) {}

  async validate(id: number) {
    if (!id) return true;
    const file = await this.fileRepository.findById(id);
    return !!file;
  }

  defaultMessage(): string {
    return 'Файл не найден';
  }
}
