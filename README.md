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

## Swagger

We have Swagger for the project.

![image](https://github.com/user-attachments/assets/1de9f795-a700-4221-b61e-12402313324b)

Public API documentation is available at http://localhost:4555/api


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

First of all? we have dockerization for the project. Our Dockerfile is ready to use.

```dockerfile
FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install -g pnpm && \
    pnpm install

COPY . .

RUN pnpm dlx prisma generate && \
    pnpm build && \
    mkdir static

EXPOSE 4555

CMD ["pnpm", "start"]
```

And we have docker-compose for the all project.

```yml
services:
    api:
        image: stbasarab/questly
        restart: always
        container_name: questly-api
        volumes:
          - ~/static:/app/static
        ports:
          - "3005:4555"
        env_file:
          - ~/.env
        depends_on:
            - db
    db:
        image: postgres:15
        restart: always
        container_name: postgres-db
        volumes:
          - ~/postgres/data:/var/lib/postgresql/data
        ports:
          - "5553:5432"
        env_file:
          - ~/.env.postgres
    
    watchtower:
        image: containrrr/watchtower
        container_name: watchtower
        restart: always
        volumes:
          - /var/run/docker.sock:/var/run/docker.sock
        command: --interval 30

    web:
      image: stbasarab/questly-web
      restart: always
      container_name: questly-web
      ports:
        - "3001:3000"
      depends_on:
        - api
```

Our backend is available on the Docker Hub. You can pull it from there.

```bash
$ docker pull stbasarab/questly
```

Also we have a **GitHub Actions** workflow for the project. Questly API is automatically deployed to the Docker Hub when a new release is created.

![image](https://github.com/user-attachments/assets/06a1e8ac-fa53-4ad1-9292-3639cf97b5f6)

We deploy our project to the **Google Cloud Platform**. We use the Google Cloud VM instance.

![image](https://github.com/user-attachments/assets/4debf1fe-ce54-4d07-9352-7d29f8db6fe5)

PUBLIC API LINK: http://34.88.61.28:3005

