import { HttpException, HttpStatus } from '@nestjs/common';

export class ValidationException extends HttpException {
  public errors: Record<string, string[]>;

  constructor(errors: Record<string, string[]>) {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        errors,
      },
      HttpStatus.BAD_REQUEST,
    );
    this.errors = errors;
  }
}
