# Delivery Orders

 Web-приложение для создания и просмотра заказов на доставку.

## Стек

- ASP.NET Core
- Entity Framework Core
- SQLite
- React
- React Router
- Docker
- Docker Compose
- Nginx

## Возможности

- создание заказа;
- просмотр списка заказов;
- автоматическая генерация номера заказа;
- просмотр деталей заказа;
- валидация обязательных полей, веса и даты забора груза.

## Запуск через Docker

Для запуска приложения необходимо установить Docker Desktop.

В корневой папке проекта выполнить:

```bash
docker compose up --build
```

После запуска приложение будет доступно по адресу:

```text
http://localhost:5173
```

Backend API:

```text
http://localhost:8081
```

База данных SQLite создаётся автоматически при запуске приложения.  
Миграции Entity Framework Core применяются автоматически.

Для остановки контейнеров:

```bash
docker compose down
```

## Локальный запуск без Docker

### Backend

Перейти в папку backend-проекта:

```bash
cd WebApplication1/WebApplication1
```

Выполнить:

```bash
dotnet restore
dotnet run
```

При запуске через HTTPS-профиль backend доступен по адресу:

```text
https://localhost:7026
```

### Frontend

Перейти в папку frontend:

```bash
cd delivery-frontend
```

Установить зависимости:

```bash
npm install
```

Для локального запуска необходимо указать адрес backend в переменной окружения:

```text
VITE_API_URL=https://localhost:7026
```

После этого запустить frontend:

```bash
npm run dev
```

Frontend будет доступен по адресу:

```text
http://localhost:5173
```

## API

Приложение использует следующие endpoints:

```text
GET  /api/orders
POST /api/orders
GET  /api/orders/{orderNumber}
```

- `GET /api/orders` — получение списка заказов;
- `POST /api/orders` — создание нового заказа;
- `GET /api/orders/{orderNumber}` — получение заказа по его номеру.

## Структура проекта

```text
DeliveryTestTask/
├── delivery-frontend/        # React frontend
├── WebApplication1/
│   └── WebApplication1/      # ASP.NET Core backend
├── docker-compose.yml
├── .gitignore
└── README.md
```

## Хранение данных

Для хранения заказов используется SQLite.

При запуске через Docker файл базы данных сохраняется в:

```text
WebApplication1/WebApplication1/data/orders.db
```

Файл базы данных не добавляется в Git-репозиторий.