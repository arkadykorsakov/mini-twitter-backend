import { PrismaClient } from '@prisma/client';
import { hash } from 'argon2';

const prisma = new PrismaClient();

async function main() {
  const [pass1, pass2, pass3] = await Promise.all([
    hash('hashed_password_1'),
    hash('hashed_password_2'),
    hash('hashed_password_3'),
  ]);

  // Проверяем существование пользователей и создаем их если не существуют
  const usersData = [
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
  ];

  // Создаем пользователей если они не существуют
  for (const userData of usersData) {
    const existingUser = await prisma.user.findUnique({
      where: { email: userData.email },
    });

    if (!existingUser) {
      await prisma.user.create({
        data: userData,
      });
      console.log(`✅ Пользователь ${userData.email} создан`);
    } else {
      console.log(`⚠️ Пользователь ${userData.email} уже существует`);
    }
  }

  // Получаем пользователей (как существующих, так и новых)
  const users = await prisma.user.findMany();
  const ivan = users.find((u) => u.email === 'ivan.petrov@example.com');
  const anna = users.find((u) => u.email === 'anna.smirnova@example.com');
  const alex = users.find((u) => u.email === 'alex.ivanov@example.com');

  if (!ivan || !anna || !alex) {
    throw new Error('Не удалось найти пользователей');
  }

  // Удаляем только посты целевых авторов, чтобы избежать удаления чужих данных
  await prisma.post.deleteMany({
    where: {
      authorId: { in: [ivan.id, anna.id, alex.id] },
    },
  });

  // Создаем посты
  const postsData = [
    // Посты Ивана (программирование)
    {
      authorId: ivan.id,
      title: 'Мой первый опыт с TypeScript',
      body: 'Сегодня я начал изучать TypeScript и хочу поделиться своими впечатлениями. TypeScript предоставляет статическую типизацию, что помогает избежать многих ошибок во время разработки...',
      imageId: null,
      createTime: new Date('2024-01-15T10:00:00Z'),
      updateTime: new Date('2024-01-15T10:00:00Z'),
    },
    {
      authorId: ivan.id,
      title: 'Лучшие практики React разработки',
      body: 'За годы работы с React я собрал коллекцию лучших практик, которые помогут вам писать более чистый и поддерживаемый код...',
      imageId: null,
      createTime: new Date('2024-01-20T14:30:00Z'),
      updateTime: new Date('2024-01-20T14:30:00Z'),
    },
    {
      authorId: ivan.id,
      title: 'Как я оптимизировал производительность приложения',
      body: 'В этом посте я расскажу о методах оптимизации, которые помогли мне ускорить наше приложение на 40%...',
      imageId: null,
      createTime: new Date('2024-01-25T16:45:00Z'),
      updateTime: new Date('2024-01-25T16:45:00Z'),
    },

    // Посты Анны (фотография)
    {
      authorId: anna.id,
      title: 'Секреты портретной фотографии',
      body: 'Портретная фотография - это искусство capturing души человека. В этом посте я поделюсь своими секретами создания выразительных портретов...',
      imageId: null,
      createTime: new Date('2024-01-16T11:20:00Z'),
      updateTime: new Date('2024-01-16T11:20:00Z'),
    },
    {
      authorId: anna.id,
      title: 'Лучшие локации для съемки в Москве',
      body: 'Москва полна удивительных мест для фотосессий. Вот мои любимые локации, которые подойдут для разных стилей съемки...',
      imageId: null,
      createTime: new Date('2024-01-22T09:15:00Z'),
      updateTime: new Date('2024-01-22T09:15:00Z'),
    },
    {
      authorId: anna.id,
      title: 'Обзор новой камеры Sony A7IV',
      body: 'Недавно я протестировала новую камеру Sony A7IV и готова поделиться своими впечатлениями. Отличный баланс цены и качества...',
      imageId: null,
      createTime: new Date('2024-01-28T13:40:00Z'),
      updateTime: new Date('2024-01-28T13:40:00Z'),
    },

    // Посты Алексея (путешествия)
    {
      authorId: alex.id,
      title: 'Путешествие по Камчатке: вулканы и гейзеры',
      body: 'Камчатка - это удивительный край вулканов, гейзеров и дикой природы. В этом посте я расскажу о своем незабываемом путешествии...',
      imageId: null,
      createTime: new Date('2024-01-18T08:00:00Z'),
      updateTime: new Date('2024-01-18T08:00:00Z'),
    },
    {
      authorId: alex.id,
      title: 'Как подготовиться к походу в горы',
      body: 'Горные походы требуют тщательной подготовки. Делюсь своим опытом и checklistом того, что нужно взять с собой...',
      imageId: null,
      createTime: new Date('2024-01-23T15:20:00Z'),
      updateTime: new Date('2024-01-23T15:20:00Z'),
    },
    {
      authorId: alex.id,
      title: 'Самые красивые места Алтая',
      body: 'Алтай поражает своей природной красотой. Озера, горы, водопады - здесь каждый найдет что-то свое...',
      imageId: null,
      createTime: new Date('2024-01-30T12:10:00Z'),
      updateTime: new Date('2024-01-30T12:10:00Z'),
    },
  ];

  await prisma.post.createMany({
    data: postsData,
  });

  console.log('✅ Посты успешно созданы!');
  console.log(`📝 Создано ${postsData.length} постов`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Ошибка при создании данных:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
