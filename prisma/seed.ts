import { PrismaClient } from '@prisma/client';
import { hash } from 'argon2';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Starting seed...');

  try {
    // Очищаем данные в правильном порядке
    await prisma.like.deleteMany();
    // await prisma.comment.deleteMany();
    await prisma.tagPost.deleteMany();
    await prisma.post.deleteMany();
    await prisma.tag.deleteMany();
    await prisma.user.deleteMany();

    console.log('✅ Database cleaned');

    // Создаем пользователей
    const users = await Promise.all([
      prisma.user.create({
        data: {
          email: 'ivan.petrov@example.com',
          passwordHash: await hash('password1'),
          name: 'Иван',
          surname: 'Петров',
          nickname: 'ivanpetrov',
          description: 'Full-stack разработчик, люблю TypeScript и React',
          isArchive: false,
        },
      }),
      prisma.user.create({
        data: {
          email: 'anna.smirnova@example.com',
          passwordHash: await hash('password2'),
          name: 'Анна',
          surname: 'Смирнова',
          nickname: 'annasm',
          description: 'Профессиональный фотограф, путешественник',
          isArchive: false,
        },
      }),
      prisma.user.create({
        data: {
          email: 'alex.ivanov@example.com',
          passwordHash: await hash('password3'),
          name: 'Алексей',
          surname: 'Иванов',
          nickname: 'alexivanov',
          description: 'Блогер-путешественник, автор книг о приключениях',
          isArchive: false,
        },
      }),
      prisma.user.create({
        data: {
          email: 'maria.kozova@example.com',
          passwordHash: await hash('password4'),
          name: 'Мария',
          surname: 'Козлова',
          nickname: 'mariko',
          description: 'Дизайнер интерфейсов, художник',
          isArchive: false,
        },
      }),
      prisma.user.create({
        data: {
          email: 'dmitry.sokolov@example.com',
          passwordHash: await hash('password5'),
          name: 'Дмитрий',
          surname: 'Соколов',
          nickname: 'dimsok',
          description: 'Data scientist, исследователь ИИ',
          isArchive: false,
        },
      }),
    ]);

    const [ivan, anna, alex, maria, dmitry] = users;
    console.log('✅ Users created');

    // Создаем теги
    const tagsData = [
      'programming',
      'typescript',
      'react',
      'webdev',
      'frontend',
      'backend',
      'nodejs',
      'database',
      'photography',
      'travel',
      'nature',
      'adventure',
      'design',
      'art',
      'ai',
      'machinelearning',
      'food',
      'health',
      'fitness',
      'music',
      'books',
      'movies',
      'technology',
      'science',
      'business',
      'startup',
      'education',
    ];

    const tags = await Promise.all(
      tagsData.map((title) => prisma.tag.create({ data: { title } })),
    );

    console.log('✅ Tags created');

    // Создаем посты
    const posts = await Promise.all([
      // Посты Ивана (программирование)
      prisma.post.create({
        data: {
          title: 'Мой первый опыт с TypeScript',
          body: 'Недавно начал изучать TypeScript и хочу поделиться впечатлениями. Статическая типизация - это просто прекрасно! Ошибки обнаруживаются на этапе компиляции, автодополнение работает лучше, а рефакторинг становится безопаснее. Рекомендую всем JavaScript-разработчикам.',
          authorId: ivan.id,
        },
      }),

      prisma.post.create({
        data: {
          title: 'Лучшие практики React разработки в 2024',
          body: 'За 5 лет работы с React собрал коллекцию лучших практик: используйте React Query для управления состоянием, TypeScript для типизации, React Hook Form для форм. Не забывайте про мемоизацию и оптимизацию перерисовок.',
          authorId: ivan.id,
        },
      }),

      prisma.post.create({
        data: {
          title: 'Как мы оптимизировали производительность приложения на 300%',
          body: 'История о том как мы с командой увеличили производительность нашего React-приложения в 3 раза. Ключевые моменты: lazy loading, code splitting, мемоизация компонентов, оптимизация бандла.',
          authorId: ivan.id,
        },
      }),

      // Посты Анны (фотография)
      prisma.post.create({
        data: {
          title: 'Секреты идеальной портретной фотографии',
          body: 'Портретная фотография - это искусство запечатления души человека. В этом посте делюсь секретами работы со светом, композицией и взаимодействием с моделью. Главное - создать доверительную атмосферу.',
          authorId: anna.id,
        },
      }),

      prisma.post.create({
        data: {
          title: 'Топ-10 локаций для фотосессий в Москве',
          body: 'Москва полна удивительных мест для фотосессий. В этом посте делюсь своими любимыми локациями: ВДНХ, Парк Горького, Красный Октябрь, старинные улочки Замоскворечья и многое другое.',
          authorId: anna.id,
        },
      }),

      // Посты Алексея (путешествия)
      prisma.post.create({
        data: {
          title: 'Путешествие по Камчатке: вулканы, гейзеры и медведи',
          body: 'Незабываемое путешествие на Камчатку - край вулканов и дикой природы. Поднимались на Авачинский вулкан, купались в горячих источниках, наблюдали за медведями на Курильском озере. Незабываемые впечатления!',
          authorId: alex.id,
        },
      }),

      prisma.post.create({
        data: {
          title: 'Как подготовиться к горному походу: полный гайд',
          body: 'Подробный гайд по подготовке к горному походу. Что взять с собой, как тренироваться, как выбрать маршрут и снаряжение. Безопасность прежде всего!',
          authorId: alex.id,
        },
      }),

      // Посты Марии (дизайн)
      prisma.post.create({
        data: {
          title: 'Тренды в веб-дизайне 2024',
          body: 'Обзор главных трендов в веб-дизайне: неоморфизм, стекляморфизм, анимированные интерфейсы, темные темы и минимализм. Что будет актуально в этом году?',
          authorId: maria.id,
        },
      }),

      // Посты Дмитрия (AI)
      prisma.post.create({
        data: {
          title: 'Введение в машинное обучение для начинающих',
          body: 'Базовые концепции машинного обучения: supervised vs unsupervised learning, нейронные сети, глубокое обучение. Простыми словами о сложных технологиях.',
          authorId: dmitry.id,
        },
      }),

      prisma.post.create({
        data: {
          title: 'Как ChatGPT изменит мир программирования',
          body: 'Анализ влияния больших языковых моделей на индустрию разработки. Будут ли программисты нужны через 10 лет? Как ИИ меняет подход к написанию кода.',
          authorId: dmitry.id,
        },
      }),
    ]);

    console.log('✅ Posts created');

    // Создаем связи между постами и тегами
    const tagPosts = await Promise.all([
      // Пост 1: TypeScript
      prisma.tagPost.createMany({
        data: [
          {
            postId: posts[0].id,
            tagId: tags.find((t) => t.title === 'programming')!.id,
          },
          {
            postId: posts[0].id,
            tagId: tags.find((t) => t.title === 'typescript')!.id,
          },
          {
            postId: posts[0].id,
            tagId: tags.find((t) => t.title === 'webdev')!.id,
          },
        ],
      }),

      // Пост 2: React
      prisma.tagPost.createMany({
        data: [
          {
            postId: posts[1].id,
            tagId: tags.find((t) => t.title === 'react')!.id,
          },
          {
            postId: posts[1].id,
            tagId: tags.find((t) => t.title === 'frontend')!.id,
          },
          {
            postId: posts[1].id,
            tagId: tags.find((t) => t.title === 'webdev')!.id,
          },
        ],
      }),

      // Пост 3: Оптимизация
      prisma.tagPost.createMany({
        data: [
          {
            postId: posts[2].id,
            tagId: tags.find((t) => t.title === 'react')!.id,
          },
          {
            postId: posts[2].id,
            tagId: tags.find((t) => t.title === 'performance')!.id,
          },
          {
            postId: posts[2].id,
            tagId: tags.find((t) => t.title === 'optimization')!.id,
          },
        ],
      }),

      // Пост 4: Фотография
      prisma.tagPost.createMany({
        data: [
          {
            postId: posts[3].id,
            tagId: tags.find((t) => t.title === 'photography')!.id,
          },
          {
            postId: posts[3].id,
            tagId: tags.find((t) => t.title === 'art')!.id,
          },
        ],
      }),

      // Пост 5: Москва
      prisma.tagPost.createMany({
        data: [
          {
            postId: posts[4].id,
            tagId: tags.find((t) => t.title === 'photography')!.id,
          },
          {
            postId: posts[4].id,
            tagId: tags.find((t) => t.title === 'travel')!.id,
          },
        ],
      }),

      // Пост 6: Камчатка
      prisma.tagPost.createMany({
        data: [
          {
            postId: posts[5].id,
            tagId: tags.find((t) => t.title === 'travel')!.id,
          },
          {
            postId: posts[5].id,
            tagId: tags.find((t) => t.title === 'adventure')!.id,
          },
          {
            postId: posts[5].id,
            tagId: tags.find((t) => t.title === 'nature')!.id,
          },
        ],
      }),

      // Пост 7: Поход
      prisma.tagPost.createMany({
        data: [
          {
            postId: posts[6].id,
            tagId: tags.find((t) => t.title === 'travel')!.id,
          },
          {
            postId: posts[6].id,
            tagId: tags.find((t) => t.title === 'adventure')!.id,
          },
        ],
      }),

      // Пост 8: Дизайн
      prisma.tagPost.createMany({
        data: [
          {
            postId: posts[7].id,
            tagId: tags.find((t) => t.title === 'design')!.id,
          },
          {
            postId: posts[7].id,
            tagId: tags.find((t) => t.title === 'webdev')!.id,
          },
        ],
      }),

      // Пост 9: ML
      prisma.tagPost.createMany({
        data: [
          {
            postId: posts[8].id,
            tagId: tags.find((t) => t.title === 'ai')!.id,
          },
          {
            postId: posts[8].id,
            tagId: tags.find((t) => t.title === 'machinelearning')!.id,
          },
        ],
      }),

      // Пост 10: ChatGPT
      prisma.tagPost.createMany({
        data: [
          {
            postId: posts[9].id,
            tagId: tags.find((t) => t.title === 'ai')!.id,
          },
          {
            postId: posts[9].id,
            tagId: tags.find((t) => t.title === 'programming')!.id,
          },
        ],
      }),
    ]);

    console.log('✅ Tag associations created');

    // Создаем лайки
    const likesData = [
      // Иван лайкает
      { userId: ivan.id, postId: posts[3].id }, // фотографию Анны
      { userId: ivan.id, postId: posts[5].id }, // путешествие Алексея
      { userId: ivan.id, postId: posts[8].id }, // AI пост Дмитрия

      // Анна лайкает
      { userId: anna.id, postId: posts[0].id }, // TypeScript Ивана
      { userId: anna.id, postId: posts[6].id }, // дизайн Марии
      { userId: anna.id, postId: posts[9].id }, // AI Дмитрия

      // Алексей лайкает
      { userId: alex.id, postId: posts[1].id }, // React Ивана
      { userId: alex.id, postId: posts[3].id }, // фотографию Анны
      { userId: alex.id, postId: posts[7].id }, // дизайн Марии

      // Мария лайкает
      { userId: maria.id, postId: posts[0].id }, // TypeScript Ивана
      { userId: maria.id, postId: posts[4].id }, // фотографию Анны
      { userId: maria.id, postId: posts[5].id }, // путешествие Алексея

      // Дмитрий лайкает
      { userId: dmitry.id, postId: posts[2].id }, // оптимизацию Ивана
      { userId: dmitry.id, postId: posts[3].id }, // фотографию Анны
      { userId: dmitry.id, postId: posts[6].id }, // дизайн Марии
    ];

    await prisma.like.createMany({
      data: likesData,
      skipDuplicates: true,
    });

    console.log('✅ Likes created');

    // Создаем комментарии
    // const commentsData = [
    //   {
    //     text: 'Отличная статья! Сам недавно начал изучать TypeScript и полностью согласен с преимуществами!',
    //     userId: anna.id,
    //     postId: posts[0].id,
    //   },
    //   {
    //     text: 'Спасибо за полезные советы по React! Обязательно попробую React Query в следующем проекте.',
    //     userId: alex.id,
    //     postId: posts[1].id,
    //   },
    //   {
    //     text: 'Красивые фотографии! Обязательно посетим эти локации в Москве.',
    //     userId: ivan.id,
    //     postId: posts[4].id,
    //   },
    //   {
    //     text: 'Очень интересный взгляд на будущее программирования! ИИ действительно меняет всё.',
    //     userId: maria.id,
    //     postId: posts[9].id,
    //   },
    // ];
    //
    // await Promise.all(
    //   commentsData.map(comment =>
    //     prisma.comment.create({
    //       data: comment,
    //     })
    //   )
    // );

    console.log('✅ Comments created');

    console.log('🎉 Seed completed successfully!');
    console.log(`👥 Users: ${users.length}`);
    console.log(`🏷️ Tags: ${tags.length}`);
    console.log(`📝 Posts: ${posts.length}`);
    console.log(`🔗 Tag associations: ${tagPosts.length}`);
    console.log(`❤️ Likes: ${likesData.length}`);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    throw error;
  }
}

// Запуск скрипта
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
