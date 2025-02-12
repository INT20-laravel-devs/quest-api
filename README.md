## Questly API

An API for the Questly web application.

## Features

- User registration and authentication (with email verification)
- User profile management
- Quest creation with different types of tasks (single choice, multiple choice, open-ended, image, location)
- Quest completion and progress tracking 
- Quests management 
- Real-time communication for users participating in the same quest using WebSockets


## Tech details
- Multi-layered architecture with separation of concerns
- RESTful API design
- Patter repository for data access
- Mappers for data transformation
- Guards for authorization
- Global exception filter

## Tech stack
- NestJS & Fastify
- PrismaORM
- PostgreSQL
- Socket.io
- JWT
- Cookie
- Docker & Docker Compose
- RxJs
- Node mailer
- SMTP

## Installation

```bash
$ git clone https://github.com/INT20-laravel-devs/quest-api.git

$ cd quest-api
```

```bash
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Environment variables

```bash
DATABASE_URL=
PORT=4555

FRONT_BASE_URL=http://localhost:3000
BACK_BASE_URL=http://localhost:4555

SMTP_HOST=
SMTP_USERNAME=
SMTP_PASSWORD=

SECRET=
TTL=

ALLOWED_ORIGINS=
```

## Deployment

