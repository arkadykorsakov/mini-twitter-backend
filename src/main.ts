import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationException } from './base/domain/exceptions/ValidationException';
import { ValidationError, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const config = new DocumentBuilder()
    .setTitle('Mini Twitter API')
    .setDescription('API for Mini Twitter')
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        const errorsObject = validationErrors.reduce<Record<string, string[]>>(
          (acc, err) => {
            acc[err.property] = Object.values(err.constraints || {});
            return acc;
          },
          {},
        );

        return new ValidationException(errorsObject);
      },
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
