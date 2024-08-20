# My Calculator Site
Demo: https://my-react-calculator-site.netlify.app/

## Описание

Калькулятор, написанный на Vite, React, scss и TypeScript. Все вычисления написанный вручную, без eval и сторонних библиотек.

## Скрипты

### Установка и сборка

Установка зависимостей:
```bash
yarn install
```

Запуск локального dev-сервера (development).
```bash
yarn dev
```

Сборка production.
```bash
yarn build
```
Запуск локального сервера (production).
```bash
yarn preview
```


### Eslint
Запускает проверку  .ts, .tsx файлов.
```bash
yarn lint
```
Запускает проверку .ts, .tsx файлов с автоматическим исправлением ошибок.
```bash
yarn lint:fix
```
### Prettier
Форматированиe файлов в проекте.
```bash
yarn format
```
Проверки форматирования файлов в проекте.
```bash
yarn format:check
```
### Husky
Устанавливает Husky и добавляет pre-commit хук для запуска lint-staged.
```bash
yarn configure-husky
```

### Тестирование
Запускает все тесты с помощью Jest.
```bash
yarn test
```

