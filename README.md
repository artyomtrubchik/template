# Backend Template

## Быстрый старт

```bash
# 1. Скопировать переменные окружения
cp .env-template .env

# 2. Поднять сервисы
docker compose up -d

# 3. Применить схему БД
npx prisma migrate dev

```

## Структура

```
src/
  app/           # Модули (users, quiz, ...)
  main.ts        # Точка входа
prisma/
  schema.prisma  # Схема БД
```

## Как добавить новый модуль

1. Создай папку в `src/app/`
2. Добавь `*.module.ts`, `*.service.ts`, `*.resolver.ts`
3. Подключи модуль в `app.module.ts`

