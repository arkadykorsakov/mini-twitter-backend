import { PrismaClient } from '@prisma/client';
import { hash } from 'argon2';

const prisma = new PrismaClient();

async function main() {
  const [pass1, pass2, pass3] = await Promise.all([
    hash('hashed_password_1'),
    hash('hashed_password_2'),
    hash('hashed_password_3'),
  ]);

  await prisma.user.createMany({
    data: [
      {
        email: 'ivan.petrov@example.com',
        passwordHash: pass1,
        name: 'Иван',
        surname: 'Петров',
        nickname: 'ivanpetrov',
        description: 'Люблю программировать и читать книги',
        isArchive: false,
        avatarId: null,
      },
      {
        email: 'anna.smirnova@example.com',
        passwordHash: pass2,
        name: 'Анна',
        surname: 'Смирнова',
        nickname: 'annasm',
        description: 'Фотограф и блогер',
        isArchive: false,
        avatarId: null,
      },
      {
        email: 'alex.ivanov@example.com',
        passwordHash: pass3,
        name: 'Алексей',
        surname: 'Иванов',
        nickname: 'alexivanov',
        description: 'Путешественник и писатель',
        isArchive: false,
        avatarId: null,
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
