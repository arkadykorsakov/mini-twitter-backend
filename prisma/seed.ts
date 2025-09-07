import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Start seeding...');

  await prisma.$transaction(async (tx) => {
    const password1 = await argon2.hash('password123');
    const password2 = await argon2.hash('password456');

    const user1 = await tx.user.create({
      data: {
        email: 'john.doe@example.com',
        passwordHash: password1,
        name: 'John',
        surname: 'Doe',
        nickname: 'johnd',
        description: 'Просто тестовый пользователь',
      },
    });

    const user2 = await tx.user.create({
      data: {
        email: 'jane.smith@example.com',
        passwordHash: password2,
        name: 'Jane',
        surname: 'Smith',
        nickname: 'janes',
      },
    });

    await tx.feed.create({
      data: {
        followerId: user1.id,
        followedId: user2.id,
      },
    });

    const tagJs = await tx.tag.create({ data: { title: 'JavaScript' } });
    const tagTs = await tx.tag.create({ data: { title: 'TypeScript' } });

    const post1 = await tx.post.create({
      data: {
        title: 'Первый пост',
        body: 'Это содержимое первого поста',
        authorId: user1.id,
        tags: {
          create: [
            { tagId: tagJs.id },
            { tagId: tagTs.id },
          ],
        },
      },
    });

    await tx.like.create({
      data: {
        postId: post1.id,
        userId: user2.id,
      },
    });
  });

  console.log('✅ Seeding finished!');
}

async function runSeed() {
  try {
    await main();
  } catch (e) {
    console.error('Error:', e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

runSeed();
