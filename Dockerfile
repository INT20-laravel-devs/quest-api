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